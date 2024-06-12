# Use a lightweight base image
FROM nginx:alpine


RUN pwd

RUN ls -la ../../
# Copy the static website files to the Nginx document root
COPY ./../../../Frontend/dist /usr/share/nginx/html