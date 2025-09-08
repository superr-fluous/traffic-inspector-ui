package dashboardhandler

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	flowhandler "github.com/koltiradw/TrafficInspector/api/handlers/flow"
	handlerutils "github.com/koltiradw/TrafficInspector/api/handlers/utils"
	"github.com/koltiradw/TrafficInspector/api/models"
	"github.com/koltiradw/TrafficInspector/api/query"
	"gorm.io/gorm"
)

type Handler struct {
	q           *query.Query
	flowHandler *flowhandler.Handler
}

func New(db *gorm.DB, flowH *flowhandler.Handler) *Handler {
	return &Handler{
		q:           query.Use(db),
		flowHandler: flowH,
	}
}

func (h *Handler) Get(c *gin.Context) {
	rows, err := h.q.Dashboard.WithContext(c.Request.Context()).Find()

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database error", err.Error(), http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, rows)
}

func (h *Handler) GetPreview(c *gin.Context) {
	var req models.WidgetPreviewParams

	if err := c.BindJSON(&req); err != nil {
		handlerutils.WriteErorrResponse(c, "Bad request", err.Error(), http.StatusBadRequest)
		return
	}

	source := req.DataSource

	if source == nil {
		handlerutils.WriteErorrResponse(c, "Invalid config", "Widget data source is not defined", http.StatusBadRequest)
		return
	}

	switch *source {
	case models.WidgetDataSourceFlows:
		h.flowHandler.FetchWidgetPreview(&req, c)
		return
	default:
		handlerutils.WriteErorrResponse(c, "Invalid config", fmt.Sprintf("Widget data source is unknown: %s", string(*source)), http.StatusBadRequest)
	}
}

func (h *Handler) GetData(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 16)

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Bad request", err.Error(), http.StatusBadRequest)
		return
	}

	rows, err := h.q.Widget.WithContext(c).Where(h.q.Widget.I.Eq(uint16(id))).Find()

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database error", err.Error(), http.StatusInternalServerError)
		return
	}

	widget := rows[0]

	// routing logic
	source := widget.DataSource

	if source == nil {
		handlerutils.WriteErorrResponse(c, "Invalid config", "Widget data source is not defined", http.StatusBadRequest)
		return
	}

	switch *source {
	case models.WidgetDataSourceFlows:
		h.flowHandler.FetchWidgetData(widget, c)
		return
	default:
		handlerutils.WriteErorrResponse(c, "Invalid config", fmt.Sprintf("Widget data source is unknown: %s", string(*source)), http.StatusBadRequest)
	}
}
