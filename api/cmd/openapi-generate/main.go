package main

import (
	"encoding/json"
	"net/http"
	"os"
	"reflect"

	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humago"
	common "github.com/koltiradw/TrafficInspector/api/cmd/openapi-generate/common"
	apischema "github.com/koltiradw/TrafficInspector/api/cmd/openapi-generate/endpoints"
	handlerutils "github.com/koltiradw/TrafficInspector/api/handlers/utils"
)

func NewSchemas(registry huma.Registry) *common.ErrorSchemas {
	return &common.ErrorSchemas{
		RespondError: huma.SchemaFromType(registry, reflect.TypeOf(handlerutils.RespondError{})).Ref,
	}
}

func main() {
	c := huma.DefaultConfig("Traffic Inspector Web API", "1.0")
	c.OpenAPI.Servers = []*huma.Server{{URL: "http://localhost:8000/api/v1"}}

	r := http.NewServeMux()
	api := humago.New(r, c)

	registry := huma.NewMapRegistry("#/components/schemas", huma.DefaultSchemaNamer)
	schemas := NewSchemas(registry)

	apischema.EndpointWidget(api, registry, schemas)
	apischema.EndpointDashboard(api, registry, schemas)

	f, err := os.Create("schema/openapi.json")

	if err != nil {
		panic(err)
	}
	defer f.Close()

	enc := json.NewEncoder(f)
	enc.SetIndent("", " ")
	if err := enc.Encode(api.OpenAPI()); err != nil {
		panic(err)
	}

	println("✅ OpenAPI spec written to schema/openapi.json")
}
