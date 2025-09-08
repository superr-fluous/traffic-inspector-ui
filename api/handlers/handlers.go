package handlers

import (
	dashboardhandler "github.com/koltiradw/TrafficInspector/api/handlers/dashboard"
	flowhandler "github.com/koltiradw/TrafficInspector/api/handlers/flow"
	healthcheckhandler "github.com/koltiradw/TrafficInspector/api/handlers/healthcheck"
	widgethandler "github.com/koltiradw/TrafficInspector/api/handlers/widget"
	"gorm.io/gorm"
)

type Handlers struct {
	Widget    *widgethandler.Handler
	Flow      *flowhandler.Handler
	Dashboard *dashboardhandler.Handler
	Health    *healthcheckhandler.Handler
}

func New(db *gorm.DB) *Handlers {
	// yeah... this is ugly
	flowH := flowhandler.New(db)
	return &Handlers{
		Widget:    widgethandler.New(db),
		Flow:      flowH,
		Dashboard: dashboardhandler.New(db, flowH),
		Health:    healthcheckhandler.New(),
	}
}
