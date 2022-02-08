FROM node:alpine

RUN npm install -g http-server

COPY ./app /app
WORKDIR /app

RUN npm install

EXPOSE 8080 
CMD ["npm","start"]