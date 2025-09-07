package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/koltiradw/TrafficInspector/api/handlers"
	"gorm.io/gorm"
)

func SetupRoutes(engine *gin.Engine, db *gorm.DB) {
	h := handlers.New(db)

	api := engine.Group("/api/v1")
	api.GET("/health", h.Health.Get)

	{
		widgetRoutes := api.Group("/widgets")
		{
			widgetRoutes.GET("/all", h.Widget.GetAll)
			widgetRoutes.PUT("/", h.Widget.Put)
			widgetRoutes.GET("/:id", h.Widget.Get)
			widgetRoutes.PATCH("/:id", h.Widget.Update)
			widgetRoutes.DELETE("/:id", h.Widget.Delete)
			widgetRoutes.PATCH("/:id/bookmark/:state", h.Widget.Toggle)
		}
		dashboardRoutes := api.Group("/dashboard")
		{
			dashboardRoutes.POST("/add", h.Dashboard.Add)
			dashboardRoutes.DELETE("/delete", h.Dashboard.Delete)
			dashboardRoutes.PATCH("/layout", h.Dashboard.Update)
		}

		flowRoutes := api.Group("/flow")
		{
			flowRoutes.GET("/all", h.Flow.GetAll)
			flowRoutes.GET("/", h.Flow.Get)
		}
	}
}
