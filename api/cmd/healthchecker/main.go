// cmd/healthchecker/main.go
package main

import (
	"log"
	"net/http"
	"os"
	"time"
)

func main() {
	log.Println("Running healthcheck...")
	BACKEND_URL := os.Getenv("BACKEND_URL")

	if BACKEND_URL == "" {
		log.Fatal("FATAL: BACKEND_URL environment variable is not set.")
		os.Exit(1)
	}

	TARGET_URL := BACKEND_URL + "/api/v1/health"

	// Use a client with a short timeout to prevent the check from hanging.
	client := http.Client{
		Timeout: 2 * time.Second,
	}

	// Attempt to send a GET request to the health endpoint.
	resp, err := client.Get(TARGET_URL)
	if err != nil {
		log.Fatalf("Healthcheck failed: %v", err)
		os.Exit(1)
	}
	defer resp.Body.Close()

	// Check for a 2xx status code.
	if resp.StatusCode != 200 {
		log.Fatalf("Healthcheck failed: received non-200 status code %d", resp.StatusCode)
		os.Exit(1)
	}

	// If all checks pass, exit with success.
	log.Println("Healthcheck successful.")
	os.Exit(0)
}
