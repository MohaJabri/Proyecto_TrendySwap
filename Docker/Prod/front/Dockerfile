# Use a lightweight base image
FROM nginx:alpine


RUN pwd

RUN ls -la /home/runner/work/Proyecto_TrendySwap/Proyecto_TrendySwap/Frontend
# Copy the static website files to the Nginx document root
COPY /home/runner/work/Proyecto_TrendySwap/Proyecto_TrendySwap/Frontend/* /usr/share/nginx/html