// db/migrations/001_init.go
package dbmigrations

import (
	"context"
	"database/sql"
	"log"

	"github.com/koltiradw/TrafficInspector/api/db"
	"github.com/koltiradw/TrafficInspector/api/models"
	"github.com/pressly/goose/v3"
	"gorm.io/gorm"
)


func init() {
	// This is the idiomatic Goose pattern for Go migrations.
	goose.AddMigrationContext(up, down)
}

// Creates ENUMS: widget_data_source, widget_data_info, widget_data_visual
func upEnums(db *gorm.DB) error {
	stmts := []string{
		`CREATE TYPE widget_data_source AS ENUM ('flows','system');`,
		`CREATE TYPE widget_data_info AS ENUM ('asn','ip','os','protocol','country','category', 'total');`,
		`CREATE TYPE widget_data_visual AS ENUM ('bar','pie','line','sensor');`,
	}
	for _, stmt := range stmts {
		if err := db.Exec(stmt).Error; err != nil {
			return err
		}
	}
	return nil
}

// Drops ENUMS: widget_data_source, widget_data_info, widget_data_visual
func downEnums(db *gorm.DB) error {
	stmts := []string{
		`DROP TYPE IF EXISTS data_source;`,
		`DROP TYPE IF EXISTS data_info;`,
		`DROP TYPE IF EXISTS data_visual;`,
	}
	for _, stmt := range stmts {
		if err := db.Exec(stmt).Error; err != nil {
			return err
		}
	}

	return nil
}

// TODO: add trigger for dashboard insertion (check that ID exists in widgets)
func up(ctx context.Context, tx *sql.Tx) error {
	// Use our new helper to get a clean, transaction-scoped GORM instance.
	gormDb, err := db.NewGormWithTx(tx)
	if err != nil {
		log.Printf("migration up failed: could not create gorm transaction: %v", err)
		return err
	}

	err = upEnums(gormDb)

	if err != nil {
		log.Printf("migration up failed: could not create enums: %v", err)
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

	err = downEnums(gormDb)

	if err != nil {
		log.Printf("migration down failed: could not drop enums: %v", err)
		return err
	}

	return gormDb.Migrator().DropTable(&models.Dashboard{}, &models.Widget{}, &models.Flow{})
}
