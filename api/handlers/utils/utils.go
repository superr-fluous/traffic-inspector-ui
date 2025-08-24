package handlerutils

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type RespondErrorMeta struct {
	Query  map[string][]string `json:"query,omitempty"`
	Params gin.Params          `json:"params,omitempty"`
}

type RespondError struct {
	Error  string            `json:"error,omitempty"`
	Detail string            `json:"detail,omitempty"`
	Meta   *RespondErrorMeta `json:"meta,omitempty"`
}

func WriteErorrResponse(c *gin.Context, err string, detail string, status int) {
	c.JSON(status, RespondError{Error: err, Detail: detail, Meta: &RespondErrorMeta{Query: c.Request.URL.Query(), Params: c.Params}})
}

func StrToBool(str string) (bool, error) {
	if str == "true" {
		return true, nil
	}
	if str == "false" {
		return false, nil
	}
	return false, fmt.Errorf("value must be 'true' or 'false', received %s", str)
}
