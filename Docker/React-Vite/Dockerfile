FROM node:18.17.1-alpine3.18
EXPOSE 5173
WORKDIR /app
COPY ./package*.json ./

RUN npm install
#CMD [ "npm", "install" ]
#CMD [ "npm", "run", "dev" ]
#ejectar el comando npm install y el comando npm run dev por consola de linux en una sola linea
CMD npm install && npm run dev
