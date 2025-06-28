FROM node:lts as build

WORKDIR /frontend
COPY package*.json ./
RUN npm ci

# Copy the rest of the application files
COPY assets ./assets
COPY src ./src
COPY tsconfig.json .
COPY build-scripts ./build-scripts
COPY build-templates ./build-templates

# Run npm build to generate static files
RUN npm run build

# Stage for Nginx setup
FROM nginx:alpine

# provide --build-arg BACKEND_HOST=* to change url to backend; needed to deploy frontend only (without docker-compose)
ARG BACKEND_HOST=backend
ENV BACKEND_HOST=${BACKEND_HOST}

# Copy the built files from the build stage to /var/www/ui
COPY --from=build /frontend/build /var/www/ui
# Need execute permissions
RUN chmod 755 /var/www/ui/assets/styles /var/www/ui/assets/templates /var/www/ui/assets/svg

# Copy the custom nginx.conf to sites-available
COPY nginx.conf /etc/nginx/sites-available/traffic-inspector-ui
# Substituting __BACKEND_HOST__ with build arg
RUN sed -i "s/__BACKEND_HOST__/${BACKEND_HOST}/g" /etc/nginx/sites-available/traffic-inspector-ui

# Create a symlink for the nginx.conf in sites-enabled
RUN mkdir -p /etc/nginx/sites-enabled
RUN ln -sf /etc/nginx/sites-available/traffic-inspector-ui /etc/nginx/sites-enabled/traffic-inspector-ui

RUN sed -i '/http {/a include /etc/nginx/sites-enabled/*;' /etc/nginx/nginx.conf

COPY docker-start.sh /start.sh

RUN apk add --no-cache dos2unix && dos2unix /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
