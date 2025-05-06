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

EXPOSE 8000

ENV API_BACKEND=:8000
# TODO: postgres container
ENV POSTGRES_HOST=postgres
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=*
ENV POSTGRES_DBNAME=flows
ENV POSTGRES_PORT=54321

CMD ["./backend"]

