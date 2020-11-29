FROM node:14-alpine

WORKDIR /usr/src

COPY . .

RUN yarn install --force && yarn cache clean && yarn build

EXPOSE 8090

CMD ["yarn", "start:prod"]
