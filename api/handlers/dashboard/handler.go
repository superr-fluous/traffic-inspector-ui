package flowhandler

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

type AddDeleteBody struct {
	Id string `json:"i"`
}

// add widget
func (h *Handler) Add(c *gin.Context) {
	var values AddDeleteBody

	if err := c.ShouldBindJSON(&values); err != nil {
		handlerutils.WriteErorrResponse(c, "Validation error", err.Error(), http.StatusBadRequest)
		return
	}

	err := h.q.Dashboard.WithContext(c).Create(&models.Dashboard{I: values.Id, Active: false})

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database error", err.Error(), http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}

// delete widget
func (h *Handler) Delete(c *gin.Context) {
	var values AddDeleteBody

	if err := c.ShouldBindJSON(&values); err != nil {
		handlerutils.WriteErorrResponse(c, "Validation error", err.Error(), http.StatusBadRequest)
		return
	}

	res, err := h.q.Dashboard.WithContext(c).Where(h.q.Dashboard.I.Eq(values.Id)).Delete()

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database error", err.Error(), http.StatusInternalServerError)
		return
	}

	if res.RowsAffected == 0 {
		handlerutils.WriteErorrResponse(c, "No widgets affected", "", http.StatusConflict)
		return
	}

	c.Status(http.StatusOK)
}

type UpdateWidget struct {
	I      string `json:"i" binding:"required"`
	Active *bool  `json:"active"`
	H      *int   `json:"h"`
	W      *int   `json:"w"`
	Y      *int   `json:"y"`
	X      *int   `json:"x"`
}

type UpdateBodyStruct struct {
	Widgets []*UpdateWidget `json:"widgets" minLength:"1" binding:"required"`
}

// bulkUpdateWidgets updates multiple widgets in one transaction
func bulkUpdateWidgets(c *gin.Context, h *Handler, updates []*UpdateWidget) error {
	return h.q.Transaction(func(tx *query.Query) error {

		for _, u := range updates {
			_, err := tx.Dashboard.WithContext(c).Where(tx.Dashboard.I.Eq(u.I)).Updates(u)
			if err != nil {
				return err
			}
		}

		return nil
	})
}

// update widget layouts
func (h *Handler) Update(c *gin.Context) {
	var values UpdateBodyStruct

	if err := c.ShouldBindJSON(&values); err != nil {
		handlerutils.WriteErorrResponse(c, "Validation error", err.Error(), http.StatusBadRequest)
		return
	}

	err := bulkUpdateWidgets(c, h, values.Widgets)

	if err != nil {
		handlerutils.WriteErorrResponse(c, "Database error", err.Error(), http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}
