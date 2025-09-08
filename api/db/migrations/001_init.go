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
	goose.AddMigrationNoTxContext(up, down)
}

func upTriggers(d *sql.DB) error {
	stmts := []string{
		`
		CREATE OR REPLACE FUNCTION update_dashboard_name()
		RETURNS TRIGGER AS $$
		BEGIN
		  UPDATE dashboards
		  SET name = NEW.name
		  WHERE i = NEW.i;
		  RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
	`,
		`
		CREATE TRIGGER update_dashboard_name
		AFTER UPDATE OF name ON widgets
		FOR EACH ROW
		EXECUTE FUNCTION update_dashboard_name();
	`,
	}

	for _, stmt := range stmts {
		_, err := d.Exec(stmt)
		if err != nil {
			return err
		}
	}

	return nil
}

func downTriggers(d *sql.DB) error {
	stmts := []string{
		`DROP TRIGGER IF EXISTS update_dashboard_name ON widgets;`,
		`DROP FUNCTION IF EXISTS update_dashboard_name();`,
	}

	for _, stmt := range stmts {
		_, err := d.Exec(stmt)
		if err != nil {
			return err
		}
	}

	return nil
}

// Creates ENUMS: widget_data_source, widget_data_info, widget_data_visual
func upEnums(d *sql.DB) error {
	stmts := []string{
		`CREATE TYPE widget_data_source AS ENUM ('flows','system');`,
		`CREATE TYPE widget_data_info AS ENUM ('asn','ip','os','protocol','country','category', 'total');`,
		`CREATE TYPE widget_data_visual AS ENUM ('bar','pie','line','sensor');`,
	}
	for _, stmt := range stmts {
		_, err := d.Exec(stmt)
		if err != nil {
			return err
		}
	}
	return nil
}

// Drops ENUMS: widget_data_source, widget_data_info, widget_data_visual
func downEnums(d *sql.DB) error {
	stmts := []string{
		`DROP TYPE IF EXISTS data_source;`,
		`DROP TYPE IF EXISTS data_info;`,
		`DROP TYPE IF EXISTS data_visual;`,
	}
	for _, stmt := range stmts {
		_, err := d.Exec(stmt)
		if err != nil {
			return err
		}
	}

	return nil
}

// TODO: add trigger for dashboard insertion (check that ID exists in widgets)
func up(ctx context.Context, d *sql.DB) error {
	// Use our new helper to get a clean, transaction-scoped GORM instance.
	gormDb, err := db.NewGorm(d)
	if err != nil {
		log.Printf("migration up failed: could not create gorm transaction: %v", err)
		return err
	}

	if err := upEnums(d); err != nil {
		log.Printf("migration up failed: could not create enums: %v", err)
		return err
	}

	migrator := gormDb.Migrator()
	if err := migrator.CreateTable(&models.Widget{}, &models.Flow{}); err != nil {
		log.Printf("migration up failed: could not auto-migrate models: %v", err)
		return err
	}

	if err := migrator.CreateTable(&models.Dashboard{}); err != nil {
		log.Printf("migration up failed: could not auto-migrate models: %v", err)
		return err
	}

	if err := upTriggers(d); err != nil {
		log.Printf("migration up failed: could not create trigger: %v", err)
		return err
	}

	return nil
}

func down(ctx context.Context, d *sql.DB) error {
	gormDb, err := db.NewGorm(d)
	if err != nil {
		log.Printf("migration down failed: could not create gorm transaction: %v", err)
		return err
	}

	if err := downEnums(d); err != nil {
		log.Printf("migration down failed: could not drop enums: %v", err)
		return err
	}

	if err := downTriggers(d); err != nil {
		log.Printf("migration down failed: could not drop triggers: %v", err)
		return err
	}

	if err := gormDb.Migrator().DropTable(&models.Dashboard{}, &models.Widget{}, &models.Flow{}); err != nil {
		log.Printf("migration down failed: could not drop tables: %v", err)
		return err
	}

	return nil
}
