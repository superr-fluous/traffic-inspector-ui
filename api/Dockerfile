FROM golang:1.24.2 AS build

WORKDIR /app
COPY . .
RUN go mod download

# Build statically linked binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix 'static' -o backend

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app
COPY --from=build /app/backend .

CMD ["./backend"]

