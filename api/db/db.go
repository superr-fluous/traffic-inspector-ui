package db

import (
	"database/sql"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"

	"github.com/koltiradw/TrafficInspector/api/config"
)

// Connect creates the main connection pool for the application.
func Connect() *gorm.DB {
	config := config.LoadDBConfig()

	db, err := gorm.Open(postgres.Open(config.DSN), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
		Logger:      logger.Default.LogMode(logger.Info),
		PrepareStmt: true, // This is fine for the main app's connection pool
	})
	if err != nil {
		panic("Failed to connect database")
	}

	sqlDB, err := db.DB()
	if err != nil {
		panic("failed to get underlying sql database instance")
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	return db
}

// NewGormWithTx creates a GORM instance from an existing SQL transaction.
// This is the key to solving the 'invalid db' error.
func NewGormWithTx(tx *sql.Tx) (*gorm.DB, error) {
	// For a transactional instance, we use a minimal config.
	// We AVOID inheriting pool-level settings like PrepareStmt,
	// as this conflicts with the state of the raw transaction.
	return gorm.Open(postgres.New(postgres.Config{
		Conn: tx,
	}), &gorm.Config{
		// Only include essential, non-connection-specific settings.
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
		// Using a simple logger for migrations is good practice.
		Logger: logger.Default.LogMode(logger.Warn),
	})
}
