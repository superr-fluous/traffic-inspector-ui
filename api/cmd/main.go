package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/koltiradw/TrafficInspector/api/config"
	"github.com/koltiradw/TrafficInspector/api/db"
	_ "github.com/koltiradw/TrafficInspector/api/db/migrations" // trigger init
	"github.com/koltiradw/TrafficInspector/api/routes"
	"github.com/pressly/goose/v3"
)

// runMigrations now uses the standard, idiomatic Goose `Up` command.
func runMigrations(sqlDb *sql.DB) {
	goose.SetDialect("postgres")

	// goose.Up will find all registered Go migrations via the blank import,
	// check the version table, and apply any that are pending.
	// It handles all the transaction and versioning logic internally.
	if err := goose.Up(sqlDb, "."); err != nil {
		log.Fatalf("Failed to apply migrations: %v", err)
	}
}

// maybe need to refactor file arch: define primitives (services): flow, dashboard, widgets.
// define data providers (only flow for now) and api handlers
// reuse service primitives for providers and api handlers
// like `type FlowService struct { q *query.Query }`
// `type Handler struct { svc *FlowService }`
// `type FlowProvider struct { svc *FlowService }`
// `type ProviderRegistry struct { providers map[string]DataProvider }`
// `type DataProvider interface { Fetch(any...) any...}`
// `
//
//	func (r *ProviderRegistry) Register(name string, p DataProvider)
//	func (r *ProviderRegistry) Get(name string) (DataProvider, bool)
//
// `

// this is needed to resolve the issue of calling a handler from handler (currently Dashboard handlers simply consume Flow handlers)
func main() {
	db := db.Connect()
	sqlDb, err := db.DB()
	if err != nil {
		log.Fatalf("Failed to get sql.DB from gorm: %v", err)
	}

	runMigrations(sqlDb)

	r := gin.Default()
	r.Use(cors.New(config.LoadCORSConfig())) // CORS middleware must be applied before defining any routes

	routes.SetupRoutes(r, db)

	c := config.LoadAPIConfig()

	server := &http.Server{
		Addr:    c.ApiEndpoint,
		Handler: r,
	}

	log.Printf("[info] start http server listening %s", c.ApiEndpoint)

	err = server.ListenAndServe()

	if err != nil {
		log.Printf("Server err: %v", err)
	}
}
