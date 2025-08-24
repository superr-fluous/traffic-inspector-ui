package config

import (
	"os"
)

type ConfigAPI struct {
	ApiEndpoint string
}

func LoadAPIConfig() ConfigAPI {
	return ConfigAPI{
		ApiEndpoint: os.Getenv("API_ENDPOINT"),
	}
}
