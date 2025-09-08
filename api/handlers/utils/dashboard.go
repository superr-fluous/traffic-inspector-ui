package handlerutils

import "github.com/koltiradw/TrafficInspector/api/models"

const rowW = 4

// DashboardPlaceNewWidget computes position for a newly added widget (mutates Dashboard in place)
func DashboardPlaceNewWidget(layout []*models.Dashboard, widget *models.Dashboard) {
	if len(layout) == 0 {
		zero := 0
		widget.X = &zero
		widget.Y = &zero
		return
	}

	lastWidget := layout[0]

	for _, w := range layout[1:] {
		if w.Y != nil && lastWidget.Y != nil && *w.Y >= *lastWidget.Y {
			lastWidget = w
		}
	}

	var (
		newY,
		newX int
	)

	if lastWidget.Y != nil {
		if lastWidget.X != nil {
			if rowW-*lastWidget.X+lastWidget.W >= 2 {
				newY = *lastWidget.Y
				newX = *lastWidget.X + lastWidget.W
			} else {
				newY = *lastWidget.Y + lastWidget.H
				newX = 0
			}
		} else {
			newX = 0
		}
	} else {
		newY = 0
	}

	widget.X = &newX
	widget.Y = &newY
}
