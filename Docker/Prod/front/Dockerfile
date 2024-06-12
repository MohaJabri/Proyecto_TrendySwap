# Use a lightweight base image
FROM nginx:alpine


RUN ls -la

RUN ls -la ./Frontend
# Copy the static website files to the Nginx document root
COPY ./Frontend /usr/share/nginx/html