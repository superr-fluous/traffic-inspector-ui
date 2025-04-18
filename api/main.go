package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/koltiradw/TrafficInspector/api/db"
	"github.com/koltiradw/TrafficInspector/api/routes"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	db := db.InitDb()
	api_endpoint := os.Getenv("API_ENDPOINT")
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"POST", "GET", "PUT", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"}
	config.ExposeHeaders = []string{"Content-Length"}
	config.AllowCredentials = true
	config.MaxAge = 12 * time.Hour

	r.Use(cors.New(config))

	server := &http.Server{
		Addr:    api_endpoint,
		Handler: routes.FlowRoutes(r, db),
	}

	log.Printf("[info] start http server listening %s", api_endpoint)

	err := server.ListenAndServe()

	if err != nil {
		log.Printf("Server err: %v", err)
	}
}
