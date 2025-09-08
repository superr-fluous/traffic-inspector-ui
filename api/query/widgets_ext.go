package query

import (
	"context"

	"gorm.io/gorm"
)

func (w *widget) ToggleTx(ctx context.Context, tx *gorm.DB, id uint16) (bool, error) {
	var newValue bool

	err := tx.WithContext(ctx).
		Raw(`
			UPDATE widgets
			SET bookmarked = NOT bookmarked
			WHERE i = ?
			RETURNING bookmarked
		`, id).
		Scan(&newValue).Error

	return newValue, err
}
