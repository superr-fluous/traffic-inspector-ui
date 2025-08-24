package widgethandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	handlerutils "github.com/koltiradw/TrafficInspector/api/handlers/utils"
	"github.com/koltiradw/TrafficInspector/api/models"
	"github.com/koltiradw/TrafficInspector/api/query"
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

// fetch a widget by an ID
func (h *Handler) Get(c *gin.Context) {
	id := c.Param("id")

	rows, err := h.q.Widget.WithContext(c.Request.Context()).Where(h.q.Widget.I.Eq(id)).Find()

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database error", err.Error(), http.StatusInternalServerError)
		return
	}

	if len(rows) == 0 {
		handlerutils.WriteErorrResponse(c, "Widget not found", "", http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, rows[0])
}

// create a widget
func (h *Handler) Put(c *gin.Context) {
	var widget *models.Widget

	if err := c.ShouldBindJSON(&widget); err != nil {
		handlerutils.WriteErorrResponse(c, "Invalid request", err.Error(), http.StatusBadRequest)
		return
	}

	// Check if widget with same ID already exists
	count, err := h.q.Widget.WithContext(c).Where(h.q.Widget.I.Eq(widget.I)).Count()

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database error", err.Error(), http.StatusInternalServerError)
		return
	}

	if count != 0 {
		handlerutils.WriteErorrResponse(c, "Widget already exists", "", http.StatusConflict)
		return
	}

	err = h.q.Widget.WithContext(c).Create(widget)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create widget"})
		handlerutils.WriteErorrResponse(c, "Database error", err.Error(), http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}

// delete a widget
func (h *Handler) Delete(c *gin.Context) {
	id := c.Param("id")

	_, err := h.q.Widget.WithContext(c.Request.Context()).Where(h.q.Widget.I.Eq(id)).Delete()

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database Error", err.Error(), http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}

// update widget
func (h *Handler) Update(c *gin.Context) {
	id := c.Param("id")
	var values struct {
		Config models.WidgetConfig `json:"config,omitempty"`
		Name   string              `json:"name,omitempty"`
	}

	if err := c.ShouldBindJSON(&values); err != nil {
		handlerutils.WriteErorrResponse(c, "Invalid request", err.Error(), http.StatusBadRequest)
		return
	}

	res, err := h.q.Widget.WithContext(c).Where(h.q.Widget.I.Eq(id)).Updates(&values)

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database error", err.Error(), http.StatusInternalServerError)
		return
	}

	if res.RowsAffected == 0 {
		handlerutils.WriteErorrResponse(c, "No effect", "No widgets affected", http.StatusConflict)
		return
	}

	c.Status(http.StatusOK)
}

// toggle widget
func (h *Handler) Toggle(c *gin.Context) {
	id := c.Param("id")
	state, err := handlerutils.StrToBool(c.Param("state"))

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Validation error", err.Error(), http.StatusBadRequest)
		return
	}

	_, err = h.q.Widget.WithContext(c).Where(h.q.Widget.I.Eq(id)).Update(h.q.Widget.Bookmarked, state)

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database Error", err.Error(), http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}
