// API integrity tests for widget
package testintegration

import (
	"fmt"
	"net/http"
	"testing"
	"time"

	"github.com/gavv/httpexpect/v2"
	testutils "github.com/koltiradw/TrafficInspector/tests/utils"
)

// TestWidgetLifecycle covers the full CRUD lifecycle of a widget.
func TestWidgetLifecycle(t *testing.T) {
	envs := testutils.GetEnvs()
	base_url := envs.BACKEND_URL + "/api/v1/widget"
	e := httpexpect.Default(t, base_url)

	// Generate a unique widget ID for this test run to ensure tests are isolated.
	widgetID := fmt.Sprintf("test-widget-%d", time.Now().UnixNano())

	// Define the widget payload based on assumed schema.
	widgetPayload := map[string]interface{}{
		"i":          widgetID,
		"name":       "My Test Widget",
		"bookmarked": false,
		"config": map[string]interface{}{
			"info":   "statistics",
			"data":   "flow",
			"visual": "line",
		},
	}

	// --- Test Cases ---

	t.Run("Create widget with invalid payload", func(t *testing.T) {
		e.PUT("").
			WithJSON(map[string]interface{}{"invalid": "data"}). // Missing required fields
			Expect().
			Status(http.StatusBadRequest).
			JSON().Object().
			Value("error").IsEqual("Invalid request")
	})

	// Also checks if bookmarked: false is accepted
	t.Run("Create new widget successfully", func(t *testing.T) {
		e.PUT("").
			WithJSON(widgetPayload).
			Expect().
			// The spec allows for 200 or 204. StatusList checks for either.
			StatusList(http.StatusOK, http.StatusNoContent)
	})

	t.Run("Attempt to create a conflicting widget", func(t *testing.T) {
		// Try to create the same widget again.
		e.PUT("").
			WithJSON(widgetPayload).
			Expect().
			Status(http.StatusConflict).
			JSON().Object().
			Value("error").IsEqual("Widget already exists")
	})

	t.Run("Get existing widget", func(t *testing.T) {
		// Retrieve the widget we just created and validate its contents.
		obj := e.GET("/{widgetID}", widgetID).
			Expect().
			Status(http.StatusOK).
			JSON().Object()

		obj.Value("i").IsEqual(widgetID)
	})

	t.Run("Get non-existent widget", func(t *testing.T) {
		e.GET("/{widgetID}", "non-existent-id").
			Expect().
			// Assuming 404 is the correct response for a missing resource.
			Status(http.StatusNotFound)
	})

	t.Run("Patch existing widget name", func(t *testing.T) {
		patchPayload := map[string]interface{}{
			"name": "My Updated Widget Name",
		}

		e.PATCH("/{widgetID}", widgetID).
			WithJSON(patchPayload).
			Expect().
			StatusList(http.StatusOK, http.StatusNoContent)
	})

	t.Run("Patch existing widget config", func(t *testing.T) {
		patchPayload := map[string]interface{}{
			"config": map[string]interface{}{
				"visual": "pie",
			},
		}

		e.PATCH("/{widgetID}", widgetID).
			WithJSON(patchPayload).
			Expect().
			StatusList(http.StatusOK, http.StatusNoContent)
	})

	t.Run("Verify widget was patched", func(t *testing.T) {
		// Get the widget again to confirm the patch was applied.
		obj := e.GET("/{widgetID}", widgetID).
			Expect().
			Status(http.StatusOK).
			JSON().Object()

		obj.Value("name").IsEqual("My Updated Widget Name")
		obj.Value("config").Object().Value("visual").IsEqual("pie")
	})

	t.Run("Toggle widget bookmark state", func(t *testing.T) {
		// Step 1: Set bookmark to "true"
		e.PATCH("/{widgetID}/bookmark/{state}", widgetID, "true").
			Expect().
			StatusList(http.StatusOK, http.StatusNoContent)

		// Step 2: Verify the bookmark is now true
		e.GET("/{widgetID}", widgetID).
			Expect().
			Status(http.StatusOK).
			JSON().Object().
			Value("bookmarked").IsEqual(true)

		// Step 3: Set bookmark to "false"
		e.PATCH("/{widgetID}/bookmark/{state}", widgetID, "false").
			Expect().
			StatusList(http.StatusOK, http.StatusNoContent)

		// Step 4: Verify the bookmark is now false
		e.GET("/{widgetID}", widgetID).
			Expect().
			Status(http.StatusOK).
			JSON().Object().
			Value("bookmarked").IsEqual(false)
	})

	t.Run("Delete widget", func(t *testing.T) {
		e.DELETE("/{widgetID}", widgetID).
			Expect().
			StatusList(http.StatusOK, http.StatusNoContent)
	})

	t.Run("Verify widget is deleted", func(t *testing.T) {
		// Attempting to get the widget again should now fail.
		e.GET("/{widgetID}", widgetID).
			Expect().
			Status(http.StatusNotFound)
	})
}
