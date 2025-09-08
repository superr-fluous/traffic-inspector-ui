package flowhandler

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/koltiradw/TrafficInspector/api/models"
	"github.com/koltiradw/TrafficInspector/api/query"
	"github.com/koltiradw/TrafficInspector/api/utils"
	"gorm.io/gen/field"
	"gorm.io/gorm"
)

type Handler struct {
	q *query.Query
}

func New(db *gorm.DB) *Handler {
	return &Handler{
		q: query.Use(db),
	}
}

func (h *Handler) Get(c *gin.Context) {
	id := c.Query("id")

	if id == "" {
		// TODO: common errors
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID is required"})
		return
	}

	flow, err := h.q.Flow.WithContext(c.Request.Context()).Where(h.q.Flow.Id.Eq(id)).First()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Flow not found"})
		return
	}

	c.JSON(http.StatusOK, flow)
}

type FlowPreview struct {
	Id         string
	LastSeen   string
	SrcIp      string
	DstIp      string
	SrcPort    uint16
	DstPort    uint16
	SrcCountry string
	DstCountry string
	Protocol   string
	Category   string
}

type GetAllResponse struct {
	data       *[]*models.Flow
	pagination *utils.Pagination
}

// returns a paginated list of flows
func (h *Handler) GetAll(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))

	p := utils.Pagination{Page: page, Size: limit}

	flows, err := h.q.Flow.WithContext(c.Request.Context()).Scopes(utils.Paginate(&p)).Order(h.q.Flow.LastSeen.Desc()).Select(
		h.q.Flow.Id,
		h.q.Flow.LastSeen,
		h.q.Flow.SrcIp,
		h.q.Flow.DstIp,
		h.q.Flow.SrcPort,
		h.q.Flow.DstPort,
		h.q.Flow.SrcCountry,
		h.q.Flow.DstCountry,
		h.q.Flow.NdpiProto.As("protocol"),
		h.q.Flow.NdpiCategory,
	).Find()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal error"})
	}

	response := GetAllResponse{
		data:       &flows,
		pagination: &p,
	}

	c.JSON(http.StatusOK, response)
}

type AggResult struct {
	Key   string `json:"id" gorm:"column:key"`
	Count int64  `json:"value" gorm:"column:count"`
}

type PairAggResult struct {
	Src []AggResult `json:"src"`
	Dst []AggResult `json:"dst"`
}

func (h *Handler) aggregateBy(c *gin.Context, column field.String) ([]AggResult, error) {
	var results []AggResult
	err := h.q.Flow.
		WithContext(c).
		Select(column.As("key"), column.Count().As("count")).
		Group(column).
		Scan(&results)
	return results, err
}

// TODO: add dataAggregate, dataStack
func (h *Handler) aggregateByPair(c *gin.Context, src, dst field.String) (*PairAggResult, error) {
	srcAgg, err := h.aggregateBy(c, src)
	if err != nil {
		return nil, err
	}

	dstAgg, err := h.aggregateBy(c, dst)
	if err != nil {
		return nil, err
	}

	return &PairAggResult{
		Src: srcAgg,
		Dst: dstAgg,
	}, nil
}

func (h *Handler) combinePair(c *gin.Context, col1, col2 field.String) ([]AggResult, error) {
	var results []AggResult

	sql := `
WITH combined AS (
    SELECT %s AS key FROM flows
    UNION ALL
    SELECT %s AS key FROM flows
)
SELECT key, COUNT(*) AS count
FROM combined
GROUP BY key
`
	sql = fmt.Sprintf(sql, col1.ColumnName().String(), col2.ColumnName().String())
	err := h.q.Flow.WithContext(c).UnderlyingDB().Raw(sql).Scan(&results).Error

	return results, err
}

func (h *Handler) fetchByInfo(info *models.WidgetDataInfo, c *gin.Context) {
	var res []AggResult
	var err error

	switch *info {
	case models.WidgetDataInfoASN:
		res, err = h.combinePair(c, h.q.Flow.SrcAS, h.q.Flow.DstAS)

	case models.WidgetDataInfoCountry:
		res, err = h.combinePair(c, h.q.Flow.SrcCountry, h.q.Flow.DstCountry)

	case models.WidgetDataInfoIP:
		res, err = h.combinePair(c, h.q.Flow.SrcIp, h.q.Flow.DstIp)


	case models.WidgetDataInfoOS:
		res, err = h.combinePair(c, h.q.Flow.SrcOS, h.q.Flow.DstOS)

	case models.WidgetDataInfoCategory:
		res, err = h.aggregateBy(c, h.q.Flow.NdpiCategory)

	case models.WidgetDataInfoProtocol:
		res, err = h.aggregateBy(c, h.q.Flow.NdpiProto)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if res == nil {
		res = []AggResult{}
	}

	c.JSON(http.StatusOK, res)
}

func (h *Handler) FetchWidgetPreview(config *models.WidgetPreviewParams, c *gin.Context) {
	h.fetchByInfo(config.DataInfo, c)
}

func (h *Handler) FetchWidgetData(widget *models.Widget, c *gin.Context) {
	h.fetchByInfo(widget.DataInfo, c)
}

func (h *Handler) Generate(c *gin.Context) {
	bytes, err := os.ReadFile("/app/sql/generate_flow.sql")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	statement := string(bytes)

	if err := h.q.WithContext(c).Flow.UnderlyingDB().Exec(statement).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(200)
}
