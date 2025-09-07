package flowhandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/koltiradw/TrafficInspector/api/models"
	"github.com/koltiradw/TrafficInspector/api/query"
	"github.com/koltiradw/TrafficInspector/api/utils"
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
