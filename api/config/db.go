package config

import (
	"fmt"
	"os"
)

type ConfigDB struct {
	DatabaseHost     string
	DatabaseUser     string
	DatabasePassword string
	DatabaseName     string
	DatabasePort     string
	DSN              string
}

// init to load and then return the instance?

func LoadDBConfig() ConfigDB {
	host := os.Getenv("POSTGRES_HOST")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DBNAME")
	port := os.Getenv("POSTGRES_PORT")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s", host, user, password, dbname, port)

	return ConfigDB{
		DatabaseHost:     host,
		DatabaseUser:     user,
		DatabasePassword: password,
		DatabaseName:     dbname,
		DatabasePort:     port,
		DSN:              dsn,
	}
}
