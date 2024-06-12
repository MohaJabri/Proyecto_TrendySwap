# Use a lightweight base image
FROM nginx:alpine

WORKDIR /app
RUN pwd

RUN ls -la
# Copy the static website files to the Nginx document root
COPY ./ /usr/share/nginx/html