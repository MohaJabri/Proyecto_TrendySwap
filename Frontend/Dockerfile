# Use a lightweight base image
FROM nginx:alpine

RUN ls -la
# Copy the static website files to the Nginx document root
COPY ./dist /usr/share/nginx/html
COPY ./sample.conf /etc/nginx/conf.d/sample.conf

RUN mkdir certs

COPY ./server.key /certs/server.key
RUN chmod 400 /certs/server.key

COPY ./server.pem /certs/server.pem
RUN chmod 400 /certs/server.pem

