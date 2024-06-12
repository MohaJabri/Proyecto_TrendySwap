# Use a lightweight base image
FROM nginx:alpine


RUN pwd

RUN ls -la /tmp/trendyfront
# Copy the static website files to the Nginx document root
COPY /tmp/trendyfront/* /usr/share/nginx/html