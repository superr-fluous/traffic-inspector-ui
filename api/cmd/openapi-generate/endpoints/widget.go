package apischema

import (
	"context"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	common "github.com/koltiradw/TrafficInspector/api/cmd/openapi-generate/common"
	"github.com/koltiradw/TrafficInspector/api/models"
)

func EndpointWidget(api huma.API, registry huma.Registry, schemas *common.ErrorSchemas) {
	huma.Register(api, huma.Operation{
		Method:      http.MethodGet,
		OperationID: "get-widget",
		Summary:     "Get widget",
		Description: "Get widget by an ID",
		Path:        "/widget/{id}",
		Tags:        []string{"widget", "GET"},
		Responses: map[string]*huma.Response{
			"404": {
				Description: "Not found",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Widget not found", ""),
					},
				},
			},
			"500": {
				Description: "Database error",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Database error", "[Database error]"),
					},
				},
			},
		},
	}, func(ctx context.Context, params *models.GetWidgetParams) (*models.GetWidgetResponse, error) {
		return &models.GetWidgetResponse{Body: models.Widget{I: params.ID, Name: "Example", Config: models.WidgetConfig{Source: "flows", Info: "TOTAL", Visual: "sensor"}}}, nil
	})

	huma.Register(api, huma.Operation{
		Method:      http.MethodPut,
		OperationID: "create-widget",
		Summary:     "Create a widget",
		Description: "Make new widget",
		Path:        "/widget",
		Tags:        []string{"widget", "CREATE"},
		Responses: map[string]*huma.Response{
			"200": {
				Description: "Success with no response body",
			},
			"400": {
				Description: "Invalid request",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Invalid request", "[ShouldBindJson Error]"),
					},
				},
			},
			"409": {
				Description: "Widget already exists",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Widget already exists", ""),
					},
				},
			},
			"500": {
				Description: "Internal server error",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Database error", "[Database error]"),
					},
				},
			},
		},
	}, func(ctx context.Context, params *models.CreateWidgetParams) (*struct{}, error) {
		return nil, nil
	})

	huma.Register(api, huma.Operation{
		Method:      http.MethodPatch,
		OperationID: "patch-widget",
		Summary:     "Patch widget",
		Description: "Change widget object",
		Path:        "/widget/{id}",
		Tags:        []string{"widget", "PATCH"},
		Responses: map[string]*huma.Response{
			"200": {
				Description: "Success with no response body",
			},
			"409": {
				Description: "No effect",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("No effect", "No widgets affected"),
					},
				},
			},
			"500": {
				Description: "Internal server error",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Database error", "[Database error]"),
					},
				},
			},
		},
	}, func(ctx context.Context, params *models.PatchWidgetParams) (*struct{}, error) {
		return nil, nil
	})

	huma.Register(api, huma.Operation{
		Method:      http.MethodPatch,
		OperationID: "toggle-widget-bookmark",
		Summary:     "Toggle widget's bookmark state",
		Description: "Add/remove widget from Dashboard",
		Path:        "/widget/{id}/bookmark/{state}",
		Tags:        []string{"widget", "PATCH"},
		Responses: map[string]*huma.Response{
			"200": {
				Description: "Success with no response body",
			},
			"400": {
				Description: "Invalid request",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Validation error", "value must be 'true' or 'false', received [state]"),
					},
				},
			},
			"500": {
				Description: "Internal server error",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Database error", "[Database error]"),
					},
				},
			},
		},
	}, func(ctx context.Context, params *models.ToggleBookmarkedParams) (*struct{}, error) {
		return nil, nil
	})

	huma.Register(api, huma.Operation{
		Method:      http.MethodDelete,
		OperationID: "delete-widget",
		Summary:     "Delete widget",
		Description: "Delete widget (also deletes it from Dashboard)",
		Path:        "/widget/{id}",
		Tags:        []string{"widget", "DELETE"},
		Responses: map[string]*huma.Response{
			"200": {
				Description: "Success with no response body",
			},
			"500": {
				Description: "Internal server error",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Database error", "[Database error]"),
					},
				},
			},
		},
	}, func(ctx context.Context, params *models.DeleteWidgetParams) (*struct{}, error) {
		return nil, nil
	})
}
