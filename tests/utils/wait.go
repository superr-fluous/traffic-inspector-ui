package testutils

import (
	"net/http"
	"testing"
	"time"
)

// WaitForAPI polls a given URL until it receives any valid HTTP response,
// indicating the service is reachable. It fails the test only if a network
// error occurs after all retries are exhausted.
func WaitForAPI(t *testing.T, serviceURL string, retries int, delay time.Duration) {
	t.Helper() // Marks this as a test helper for better error reporting.

	for i := 0; i < retries; i++ {
		// Attempt to send a GET request.
		resp, err := http.Get(serviceURL)

		// If there is no error, it means the server responded.
		// It doesn't matter what the status code is.
		if err == nil {
			// It's crucial to close the response body to free up resources.
			resp.Body.Close()
			t.Logf("Service at %s is responding!", serviceURL)
			return // The service is up, exit successfully.
		}

		// Log the attempt and wait before the next retry.
		t.Logf("Waiting for service at %s... (attempt %d/%d). Error: %v", serviceURL, i+1, retries, err)
		time.Sleep(delay)
	}

	// If the loop completes, the service did not become available.
	t.Fatalf("Service at %s did not become available after %d retries.", serviceURL, retries)
}
