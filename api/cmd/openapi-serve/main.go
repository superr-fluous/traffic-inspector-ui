package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./schema"))

	// change swagger-bundle to https://github.com/stoplightio/elements ?
	http.Handle("/swagger", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./schema/swagger.html")
	}))

	http.Handle("/spotlight", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./schema/spotlight.html")
	}))

	http.Handle("/scalar", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./schema/scalar.html")
	}))

	http.Handle("/openapi.json", fs)

	log.Println("✅\tServing docs at http://localhost:8080")
	log.Println("ℹ\thttp://localhost:8080/swagger for Swagger UI")
	log.Println("ℹ\thttp://localhost:8080/spotlight for Spotlight UI")
	log.Println("ℹ\thttp://localhost:8080/scalar for Scalar UI")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
