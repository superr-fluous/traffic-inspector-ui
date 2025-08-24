package apischema

import (
	"context"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	common "github.com/koltiradw/TrafficInspector/api/cmd/openapi-generate/common"
	"github.com/koltiradw/TrafficInspector/api/models"
)

func EndpointDashboard(api huma.API, registry huma.Registry, schemas *common.ErrorSchemas) {
	huma.Register(api, huma.Operation{
		Method:      http.MethodPost,
		OperationID: "dashboard-add-widget",
		Summary:     "Add widget to Dashboard",
		Description: "Adds existing widget to Dashboard",
		Path:        "/dashboard/add",
		Tags:        []string{"dashboard", "widget", "POST"},
		Responses: map[string]*huma.Response{
			"200": {
				Description: "Success with no response body",
			},
			"400": {
				Description: "Invalid request",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Validation error", "[ShouldBindJson Error]"),
					},
				},
			},
			"500": {
				Description: "Database error",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Database error", "[Database Error]"),
					},
				},
			},
		},
	}, func(ctx context.Context, params *models.AddDashboardWidgetParams) (*struct{}, error) {
		return nil, nil
	})

	huma.Register(api, huma.Operation{
		Method:      http.MethodDelete,
		OperationID: "dashboard-delete-widget",
		Summary:     "Delete widget from Dashboard",
		Description: "Delete existing widget from Dashboard",
		Path:        "/dashboard/delete",
		Tags:        []string{"dashboard", "widget", "DELETE"},
		Responses: map[string]*huma.Response{
			"200": {
				Description: "Success with no response body",
			},
			"400": {
				Description: "Invalid request",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Validation error", "[ShouldBindJson Error]"),
					},
				},
			},
			"409": {
				Description: "No effect",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("No widgets affected", ""),
					},
				},
			},
			"500": {
				Description: "Internal server error",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Database error", "[Database Error]"),
					},
				},
			},
		},
	}, func(ctx context.Context, params *models.DeleteDashboardWidgetParams) (*struct{}, error) {
		return nil, nil
	})

	huma.Register(api, huma.Operation{
		Method:      http.MethodPatch,
		OperationID: "dashboard-update-layout",
		Summary:     "Update widget layouts",
		Description: "Update widgets' layouts",
		Path:        "/dashboard/layout",
		Tags:        []string{"dashboard", "widget", "PATCH"},
		Responses: map[string]*huma.Response{
			"200": {
				Description: "Success with no response body",
			},
			"400": {
				Description: "Validation error",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Validation error", "[ShouldBindJson Error]"),
					},
				},
			},
			"500": {
				Description: "Internal server error",
				Content: map[string]*huma.MediaType{
					"application/json": {
						Schema:  registry.SchemaFromRef(schemas.RespondError),
						Example: common.MakeRespondError("Database error", "[Database Error]"),
					},
				},
			},
		},
	}, func(ctx context.Context, params *models.UpdateDashboardLayout) (*struct{}, error) {
		return nil, nil
	})
}
