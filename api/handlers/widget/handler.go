package widgethandler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	handlerutils "github.com/koltiradw/TrafficInspector/api/handlers/utils"
	"github.com/koltiradw/TrafficInspector/api/models"
	"github.com/koltiradw/TrafficInspector/api/query"
	"github.com/koltiradw/TrafficInspector/api/utils"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
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
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 16)

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Bad request", err.Error(), http.StatusBadRequest)
		return
	}

	rows, err := h.q.Widget.WithContext(c.Request.Context()).Where(h.q.Widget.I.Eq(uint16(id))).Find()

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

// fetch all widgets
func (h *Handler) GetAll(c *gin.Context) {
	rows, err := h.q.Widget.WithContext(c.Request.Context()).Find()

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database error", err.Error(), http.StatusInternalServerError)
	}

	c.JSON(http.StatusOK, rows)
}

// Create a widget (all fields except for `i` are default)
func (h *Handler) Put(c *gin.Context) {
	widget := models.Widget{}
	err := h.q.Widget.WithContext(c).Create(&widget)

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database error", err.Error(), http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, widget.I)
}

// delete a widget
func (h *Handler) Delete(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 16)

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Bad request", err.Error(), http.StatusBadRequest)
		return
	}

	_, err = h.q.Widget.WithContext(c.Request.Context()).Where(h.q.Widget.I.Eq(uint16(id))).Delete()

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database Error", err.Error(), http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}

// update widget
func (h *Handler) Update(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 16)

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Bad request", err.Error(), http.StatusBadRequest)
		return
	}

	var req models.WidgetUpdateParams
	err = c.BindJSON(&req)

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Bad request", err.Error(), http.StatusBadRequest)
		return
	}

	widget := models.Widget{I: uint16(id)}
	utils.ApplyNonNilFields(&widget, &req)

	res, err := h.q.Widget.WithContext(c.Request.Context()).Where(h.q.Widget.I.Eq(widget.I)).Updates(&widget)

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

// Toggle toggles widget's bookmarked state
func (h *Handler) Toggle(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.ParseUint(idStr, 10, 16)

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Bad request", err.Error(), http.StatusBadRequest)
		return
	}

	id16 := uint16(id)

	// transaction
	err = h.q.WithContext(c.Request.Context()).Widget.UnderlyingDB().Transaction(func(tx *gorm.DB) error {
		newValue, err := h.q.Widget.ToggleTx(c, tx, id16)

		if err != nil {
			return err
		}

		if newValue {
			dashboard := models.Dashboard{I: id16, W: 4, H: 4}
			dashboards, err := h.q.WithContext(c.Request.Context()).Dashboard.Find()

			if err != nil {
				return err
			}

			handlerutils.DashboardPlaceNewWidget(dashboards, &dashboard)
			dashboards = append(dashboards, &dashboard)

			// upsert
			err = h.q.Dashboard.WithContext(c.Request.Context()).
				Clauses(clause.OnConflict{
					UpdateAll: true,
				}).
				Create(dashboards...)

			if err != nil {
				return err
			}

			// err = h.q.WithContext(c.Request.Context()).Dashboard.Create(&dashboard)
		} else {
			// remove from dashboard
			_, err = h.q.WithContext(c.Request.Context()).Dashboard.Where(h.q.Dashboard.I.Eq(id16)).Delete()
		}

		return err
	})

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database Error", err.Error(), http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}
