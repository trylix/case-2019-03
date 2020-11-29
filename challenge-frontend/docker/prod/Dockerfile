FROM node:13-alpine

WORKDIR /usr/src

COPY . .

RUN yarn install --force && yarn cache clean && yarn build

FROM nginx:alpine

COPY --from=0 /usr/src/build /usr/share/nginx/html

COPY --from=0 /usr/src/docker/prod/nginx.conf /etc/nginx/conf.d/default.conf