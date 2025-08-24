// db/migrations/001_init.go
package dbmigrations

import (
	"context"
	"database/sql"
	"log"

	"github.com/koltiradw/TrafficInspector/api/db"
	"github.com/koltiradw/TrafficInspector/api/models"
	"github.com/pressly/goose/v3"
)

func init() {
	// This is the idiomatic Goose pattern for Go migrations.
	goose.AddMigrationContext(up, down)
}

// TODO: add trigger for dashboard insertion (check that ID exists in widgets)
func up(ctx context.Context, tx *sql.Tx) error {
	// Use our new helper to get a clean, transaction-scoped GORM instance.
	gormDb, err := db.NewGormWithTx(tx)
	if err != nil {
		log.Printf("migration up failed: could not create gorm transaction: %v", err)
		return err
	}
	return gormDb.AutoMigrate(&models.Dashboard{}, &models.Widget{}, &models.Flow{})
}

func down(ctx context.Context, tx *sql.Tx) error {
	gormDb, err := db.NewGormWithTx(tx)
	if err != nil {
		log.Printf("migration down failed: could not create gorm transaction: %v", err)
		return err
	}
	return gormDb.Migrator().DropTable(&models.Dashboard{}, &models.Widget{}, &models.Flow{})
}
