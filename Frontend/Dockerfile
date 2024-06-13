# Use a lightweight base image
FROM nginx:alpine

RUN ls -la
# Copy the static website files to the Nginx document root
COPY ./dist /usr/share/nginx/html
COPY ./sample.conf /etc/nginx/conf.d/sample.conf

RUN mkdir certs

RUN --mount=type=secret,id=server_key 
RUN chmod 400 /run/secrets/server_key
COPY /run/secrets/server_key /certs/server.key

RUN --mount=type=secret,id=server_pem 
RUN chmod 400 /run/secrets/server_pem
COPY /run/secrets/server_pem /certs/server.server_pem


