package models

type Dashboard struct {
	I      string `gorm:"primaryKey;not null" json:"i"`
	X      *int   `json:"x"`
	Y      *int   `json:"y"`
	W      *int   `json:"w"`
	H      *int   `json:"h"`
	Active bool   `gorm:"not null;default:false" json:"active"`
}

type AddDashboardWidgetParams struct {
	Body struct {
		WidgetID string `json:"i"`
	}
}

type DeleteDashboardWidgetParams struct {
	Body struct {
		WidgetID string `json:"i"`
	}
}

type UpdateDashboardLayout struct {
	Body struct {
		Widgets []Dashboard `json:"widgets" binding:"required"`
	}
}
