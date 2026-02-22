FROM node:alpine3.22

WORKDIR /aplication

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node","server.js" ]