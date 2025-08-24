package apischema

import handlerutils "github.com/koltiradw/TrafficInspector/api/handlers/utils"

func MakeRespondError(err string, detail string) *handlerutils.RespondError {
	return &handlerutils.RespondError{Error: err, Detail: detail}
}

type ErrorSchemas struct {
	RespondError string
}
