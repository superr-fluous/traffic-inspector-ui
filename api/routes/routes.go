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
			widgetRoutes.PATCH("/:id/bookmark", h.Widget.Toggle)
		}
		
		dashboardRoutes := api.Group("/dashboard")
		{
			dashboardRoutes.GET("/", h.Dashboard.Get)
			dashboardRoutes.GET("/data/:id", h.Dashboard.GetData)
			dashboardRoutes.POST("/preview", h.Dashboard.GetPreview)
		}
		
		flowRoutes := api.Group("/flow")
		{
			flowRoutes.GET("/all", h.Flow.GetAll)
			flowRoutes.GET("/", h.Flow.Get)
			flowRoutes.POST("/generate", h.Flow.Generate)
		}
	}
}
