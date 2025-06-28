#!/bin/sh
# this way nginx -t is executed at runtime where it can resolve BACKEND_HOST value
nginx -t || exit 1

exec nginx -g 'daemon off;'
