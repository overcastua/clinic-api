FROM node:14-alpine

WORKDIR /app

COPY ./package.json ./

COPY ./packages/notifications ./packages/notifications
COPY ./packages/common ./packages/common

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /app/packages/common

RUN yarn build

WORKDIR /app/packages/notifications

CMD yarn start:dev
