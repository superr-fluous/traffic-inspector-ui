# ---- Build Stage ----
# Use a specific Go version for reproducible builds
FROM golang:1.24.3 AS build

WORKDIR /app

# 1. Copy and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# 2. Copy the rest of the source code
COPY . .

# 3. Build the main application binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /app/backend ./cmd

# 4. Build the healthchecker binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /app/healthchecker ./cmd/healthchecker


# ---- Final Stage (Reverted to scratch) ----
# This creates the smallest, most secure possible image.
# FROM scratch
FROM alpine:latest

# 1. Copy the CA certificates, which the main app might need.
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# 2. Set the application's home directory.
WORKDIR /app

# 3. Use a non-root user for security.
# We specify a UID directly as scratch has no user management tools.
USER 10001

# 4. Copy both compiled binaries from the build stage.
# Ensure the non-root user has ownership.
COPY --from=build --chown=10001:10001 /app/backend /app/backend
COPY --from=build --chown=10001:10001 /app/healthchecker /app/healthchecker

# 5. Copy the migrations directory (if you are NOT embedding them).
# If you are embedding migrations into the binary, you can delete this line.
COPY --from=build --chown=10001:10001 /app/db/migrations /app/migrations
COPY --from=build --chown=10001:10001 /app/sql /app/sql

# 6. Set the main application binary as the entrypoint.
# ENTRYPOINT ["./backend"]
ENTRYPOINT [ "./backend" ]
