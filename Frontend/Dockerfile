# Use a lightweight base image
FROM nginx:alpine

RUN ls -la
# Copy the static website files to the Nginx document root
COPY ./dist /usr/share/nginx/html
COPY ./sample.conf /etc/nginx/conf.d/sample.conf

RUN mkdir certs

RUN chmod 400 server.key
COPY server.key /certs/server.key

RUN chmod 400 server.pem
COPY server.pem /certs/server.server_pem


