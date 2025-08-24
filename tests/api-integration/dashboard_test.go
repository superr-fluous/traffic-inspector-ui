package testintegration

import (
	"net/http"
	"testing"

	"github.com/gavv/httpexpect/v2"
	testutils "github.com/koltiradw/TrafficInspector/tests/utils"
)

func TestDashboardEndpoints(t *testing.T) {
	envs := testutils.GetEnvs()
	base_url := envs.BACKEND_URL + "/api/v1/dashboard"
	e := httpexpect.Default(t, base_url)

	// Tests for POST /add
	t.Run("Add Widget", func(t *testing.T) {
		// Test Case: Successful addition
		e.POST("/add").
			WithJSON(map[string]interface{}{
				"i": "widget-1",
			}).
			Expect().
			Status(http.StatusOK)

		e.POST("/add").
			WithJSON(map[string]interface{}{
				"i": "widget-2",
			}).
			Expect().
			Status(http.StatusOK)

		e.POST("/add").
			WithJSON(map[string]interface{}{
				"i": "widget-to-delete",
			}).
			Expect().
			Status(http.StatusOK)

		// Test Case: Invalid request (e.g., missing required field)
		e.POST("/add").
			WithJSON(map[string]interface{}{
				"i":      1,
				"active": true,
			}).
			Expect().
			Status(http.StatusBadRequest).
			JSON().Object().HasValue("error", "Validation error")
	})

	// Tests for DELETE /delete
	t.Run("Delete Widget", func(t *testing.T) {
		// Test Case: Successful deletion
		e.DELETE("/delete").
			WithJSON(map[string]string{"i": "widget-to-delete"}).
			Expect().
			Status(http.StatusOK)

		// Test Case: Invalid request (e.g., empty body)
		e.DELETE("/delete").
			WithText("").
			Expect().
			Status(http.StatusBadRequest)

		// Test Case: Widget not found (no effect)
		e.DELETE("/delete").
			WithJSON(map[string]string{"i": "non-existent-id"}).
			Expect().
			Status(http.StatusConflict).
			JSON().Object().HasValue("error", "No widgets affected")
	})

	// Tests for PUT /layout
	t.Run("Update Layout", func(t *testing.T) {
		// Test Case: Successful layout update
		layoutUpdate := []map[string]interface{}{
			{"i": "widget-1", "x": 10, "y": 20},
			{"i": "widget-2", "x": 15, "y": 25},
		}
		body := map[string]any{
			"widgets": layoutUpdate,
		}

		e.PATCH("/layout").
			WithJSON(body).
			Expect().
			Status(http.StatusOK)

		// Test Case: Validation error (e.g., wrong data type)
		layoutUpdate = []map[string]interface{}{
			{"i": "widget-1", "x": "should-be-int", "y": 20},
		}
		body = map[string]any{
			"widgets": layoutUpdate,
		}

		e.PATCH("/layout").
			WithJSON(body).
			Expect().
			Status(http.StatusBadRequest).
			JSON().Object().HasValue("error", "Validation error")
	})
}
