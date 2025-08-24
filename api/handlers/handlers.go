package handlers

import (
	dashboardhandler "github.com/koltiradw/TrafficInspector/api/handlers/dashboard"
	flowhandler "github.com/koltiradw/TrafficInspector/api/handlers/flow"
	healthcheckhandler "github.com/koltiradw/TrafficInspector/api/handlers/healthcheck"
	widgethandler "github.com/koltiradw/TrafficInspector/api/handlers/widget"
	"gorm.io/gorm"
)

// Handlers bundles all handler instances together.
type Handlers struct {
	Widget    *widgethandler.Handler
	Flow      *flowhandler.Handler
	Dashboard *dashboardhandler.Handler
	Health    *healthcheckhandler.Handler
}

// New creates and returns a new Handlers instance with all dependencies resolved.
func New(db *gorm.DB) *Handlers {
	return &Handlers{
		Widget:    widgethandler.New(db),
		Flow:      flowhandler.New(db),
		Dashboard: dashboardhandler.New(db),
		Health:    healthcheckhandler.New(),
	}
}
