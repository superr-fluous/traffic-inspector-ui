package utils

import (
	"reflect"
)

// ApplyNonNilFields copies only non-nil fields from src (a DTO) into dst (your model).
// Using DTO like WidgetUpdateRequest + ApplyNonFields allows for setting "zero-values" like false for bool.
// NOTE: All updatable DTO fields should be pointers (*string, *bool, etc.).
// NOTE: ApplyNonNilFields only copies fields that are non-nil pointers.
func ApplyNonNilFields(dst any, src any) {
	dv := reflect.ValueOf(dst).Elem()
	sv := reflect.ValueOf(src).Elem()
	st := sv.Type()

	for i := 0; i < sv.NumField(); i++ {
		sf := sv.Field(i)
		df := dv.FieldByName(st.Field(i).Name)

		if !df.IsValid() || !df.CanSet() {
			continue
		}

		// Only handle pointer fields
		if sf.Kind() == reflect.Ptr && !sf.IsNil() {
			// df.Set(sf.Elem()) if df is a value type, or df.Set(sf) if df is also a pointer
			if df.Kind() == reflect.Ptr {
				df.Set(sf)
			} else {
				df.Set(sf.Elem())
			}
		}
	}
}
