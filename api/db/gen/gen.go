package main

import (
	"github.com/koltiradw/TrafficInspector/api/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gen"
	"gorm.io/gorm"
)

func main() {
	// gorm/gen requires a db connection to generate code
	// gorm's DryRun mode creates a gorm.DB instance that doesn't connect to DB and only prepares SQL queries
	db, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{
		DryRun: true,
	})

	if err != nil {
		panic("failed to initialize dry run DB")
	}

	g := gen.NewGenerator(gen.Config{
		OutPath: "./query",
		Mode:    gen.WithDefaultQuery | gen.WithQueryInterface,
	})

	// this will use existing database to parse models
	g.UseDB(db)
	g.ApplyBasic(models.Widget{}, models.Dashboard{}, models.Flow{})
	g.Execute()
}
