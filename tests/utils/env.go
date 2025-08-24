package testutils

import (
	"log"
	"os"
)

var BACKEND_URL string

type Env struct {
	BACKEND_URL string
}

func init() {
	BACKEND_URL = os.Getenv("BACKEND_URL")
	if BACKEND_URL == "" {
		log.Fatal("FATAL: BACKEND_URL environment variable is not set.")
	}
}

func GetEnvs() Env {
	return Env{BACKEND_URL: BACKEND_URL}
}
