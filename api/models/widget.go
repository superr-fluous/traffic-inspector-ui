package models

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

type WidgetConfig struct {
	Source string `gorm:"type:string" json:"source"`
	Info   string `gorm:"type:string" json:"info"`
	Visual string `gorm:"type:string" json:"visual"`
}

// Scan implements the sql.Scanner interface
func (wc *WidgetConfig) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("failed to scan WidgetConfig: %v", value)
	}
	return json.Unmarshal(bytes, wc)
}

// Value implements the driver.Valuer interface
func (wc WidgetConfig) Value() (driver.Value, error) {
	return json.Marshal(wc)
}

type Widget struct {
	I          string       `gorm:"primaryKey" json:"i" binding:"required" minLength:"1" doc:"Unique widget ID"` // corresponds to layout "i"
	Name       string       `gorm:"not null" json:"name" binding:"required" minLength:"1" doc:"Displayed name"`
	Config     WidgetConfig `gorm:"type:jsonb;not null" json:"config" binding:"required" doc:"Widget config"`
	Bookmarked *bool        `gorm:"not null" json:"bookmarked" binding:"required" doc:"Bookmarked flag"` // pointer needed to not trigger validation error with false value
}

// -- GET widget
type GetWidgetParams struct {
	ID string `path:"widgetID"`
}

type GetWidgetResponse struct {
	Body Widget
}

// -- CREATE widget
type CreateWidgetParams struct {
	Body Widget
}

// -- PATCH widget
type PatchWidgetParams struct {
	ID   string `path:"widgetID"`
	Body struct {
		Name   *string       `json:"name,omitempty"`
		Config *WidgetConfig `json:"config,omitempty"`
	}
}

type ToggleBookmarkedParams struct {
	ID    string `path:"widgetID"`
	State string `path:"state"`
}

// -- DElETE widget
type DeleteWidgetParams struct {
	ID string `path:"widgetID"`
}
