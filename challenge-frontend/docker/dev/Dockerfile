FROM node:14-alpine

WORKDIR /usr/src

COPY package.json .

RUN yarn install --silent

EXPOSE 8080

COPY . .
