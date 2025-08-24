package config

import (
	"strings"
	"time"

	"github.com/gin-contrib/cors"
)

func LoadCORSConfig() cors.Config {
	config := cors.Config{
		AllowOriginFunc: func(origin string) bool {
			return strings.HasPrefix(origin, "http://localhost:") || strings.HasPrefix(origin, "http://nginx:") || strings.HasPrefix(origin, "http://tester:")
		},
		AllowMethods:     []string{"POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	return config
}
