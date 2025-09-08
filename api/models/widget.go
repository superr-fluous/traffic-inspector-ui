package models

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"

	"gorm.io/datatypes"
)

type WidgetDataSource string
type WidgetDataInfo string
type WidgetDataVisual string
type WidgetFilters datatypes.JSON
type WidgetConfig datatypes.JSON

func (w WidgetFilters) MarshalJSON() ([]byte, error) {
	if len(w) == 0 {
		return []byte(`{}`), nil
	}
	return w, nil
}

func (w WidgetConfig) MarshalJSON() ([]byte, error) {
	if len(w) == 0 {
		return []byte(`{}`), nil
	}
	return w, nil
}

func (w *WidgetFilters) UnmarshalJSON(data []byte) error {
	if len(data) == 0 || string(data) == "null" {
		*w = WidgetFilters([]byte(`{}`))
		return nil
	}
	*w = WidgetFilters(data)
	return nil
}

func (w *WidgetConfig) UnmarshalJSON(data []byte) error {
	if len(data) == 0 || string(data) == "null" {
		*w = WidgetConfig([]byte(`{}`))
		return nil
	}
	*w = WidgetConfig(data)
	return nil
}

// --- driver.Valuer ---
func (w WidgetFilters) Value() (driver.Value, error) {
	return datatypes.JSON(w).Value()
}

func (w WidgetConfig) Value() (driver.Value, error) {
	return datatypes.JSON(w).Value()
}

// --- sql.Scanner ---
func (w *WidgetFilters) Scan(value any) error {
	return (*datatypes.JSON)(w).Scan(value)
}

func (w *WidgetConfig) Scan(value any) error {
	return (*datatypes.JSON)(w).Scan(value)
}

// --- Convenience Helpers ---

// AsMap decodes JSON into a map[string]any
func (w WidgetConfig) AsMap() (map[string]any, error) {
	if len(w) == 0 {
		return map[string]any{}, nil
	}
	var m map[string]any
	if err := json.Unmarshal(w, &m); err != nil {
		return nil, fmt.Errorf("WidgetConfig.AsMap: %w", err)
	}
	return m, nil
}

func (w WidgetFilters) AsMap() (map[string]any, error) {
	if len(w) == 0 {
		return map[string]any{}, nil
	}
	var m map[string]any
	if err := json.Unmarshal(w, &m); err != nil {
		return nil, fmt.Errorf("WidgetFilters.AsMap: %w", err)
	}
	return m, nil
}

// FromMap encodes a map[string]any into JSON
func (w *WidgetConfig) FromMap(m map[string]any) error {
	b, err := json.Marshal(m)
	if err != nil {
		return fmt.Errorf("WidgetConfig.FromMap: %w", err)
	}
	*w = WidgetConfig(b)
	return nil
}

func (w *WidgetFilters) FromMap(m map[string]any) error {
	b, err := json.Marshal(m)
	if err != nil {
		return fmt.Errorf("WidgetFilters.FromMap: %w", err)
	}
	*w = WidgetFilters(b)
	return nil
}

const (
	// WidgetDataSource
	WidgetDataSourceFlows  WidgetDataSource = "flows"
	WidgetDataSourceSystem WidgetDataSource = "system"

	// WidgetDataInfo
	WidgetDataInfoASN      WidgetDataInfo = "asn"
	WidgetDataInfoIP       WidgetDataInfo = "ip"
	WidgetDataInfoOS       WidgetDataInfo = "os"
	WidgetDataInfoProtocol WidgetDataInfo = "protocol"
	WidgetDataInfoCountry  WidgetDataInfo = "country"
	WidgetDataInfoCategory WidgetDataInfo = "category"
	WidgetDataInfoTotal    WidgetDataInfo = "total"

	// WidgetDataVisual
	WidgetDataVisualBar    WidgetDataVisual = "bar"
	WidgetDataVisualPie    WidgetDataVisual = "pie"
	WidgetDataVisualLine   WidgetDataVisual = "line"
	WidgetDataVisualSensor WidgetDataVisual = "sensor"
)

func PtrWidgetDataSource(v WidgetDataSource) *WidgetDataSource {
	return &v
}

func PtrWidgetDataInfo(v WidgetDataInfo) *WidgetDataInfo {
	return &v
}

func PtrWidgetDataVisual(v WidgetDataVisual) *WidgetDataVisual {
	return &v
}

type Widget struct {
	I          uint16            `gorm:"primaryKey;autoIncrement" json:"i" binding:"required" doc:"Unique widget ID"` // corresponds to layout "i"
	Name       string            `gorm:"not null;default:''" json:"name" binding:"required" minLength:"1" doc:"Displayed name"`
	DataSource *WidgetDataSource `gorm:"type:widget_data_source;default:null" json:"dataSource" doc:"Widget data source"`
	DataInfo   *WidgetDataInfo   `gorm:"type:widget_data_info;default:null" json:"dataInfo" doc:"Widget data information type"`
	DataVisual *WidgetDataVisual `gorm:"type:widget_data_visual;default:null" json:"dataVisual" doc:"Widget data visual representation"`
	Filters    WidgetFilters     `gorm:"not null;default:'{}'" json:"filters" doc:"Widget data type filters"`
	Config     WidgetConfig      `gorm:"not null;default:'{}'" json:"config" doc:"Widget extra config"`
	Bookmarked bool              `gorm:"not null;default:false" json:"bookmarked" binding:"required" doc:"Bookmarked flag"`
}

// -- GET widget
type GetWidgetParams struct {
	ID string `path:"id"`
}

type GetWidgetResponse struct {
	Body Widget
}

// -- CREATE widget
type CreateWidgetParams struct {
	Body Widget
}

// -- PATCH widget
type WidgetUpdateParams struct {
	Name       *string           `json:"name,omitempty"`
	DataSource *WidgetDataSource `json:"dataSource,omitempty"`
	DataVisual *WidgetDataVisual `json:"dataVisual,omitempty"`
	DataInfo   *WidgetDataInfo   `json:"dataInfo,omitempty"`
	Filters    *WidgetFilters    `json:"filters,omitempty"`
	Config     *WidgetConfig     `json:"config,omitempty"`
}

type ToggleBookmarkedParams struct {
	ID    string `path:"id"`
	State string `path:"state"`
}

// -- DElETE widget
type DeleteWidgetParams struct {
	ID string `path:"id"`
}

// GET preview
type WidgetPreviewParams struct {
	DataSource *WidgetDataSource `json:"dataSource,omitempty"`
	DataVisual *WidgetDataVisual `json:"dataVisual,omitempty"`
	DataInfo   *WidgetDataInfo   `json:"dataInfo,omitempty"`
	Filters    *WidgetFilters    `json:"filters,omitempty"`
	Config     *WidgetConfig     `json:"config,omitempty"`
}