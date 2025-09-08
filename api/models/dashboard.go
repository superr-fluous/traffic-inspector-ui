package models

type Dashboard struct {
	I    uint16 `gorm:"primaryKey" json:"i"` // shared PK (must match Widget.I)
	X    *int   `json:"x"`
	Y    *int   `json:"y"`
	W    int    `json:"w"`
	H    int    `json:"h"`
	Name string `json:"name"`

	Widget     Widget `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:I;references:I"`
	WidgetName Widget `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:Name;references:Name"`
}
