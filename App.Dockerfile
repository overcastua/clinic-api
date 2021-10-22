FROM node:16-alpine

WORKDIR /app

COPY ./package.json .
COPY ./packages/app ./packages/app
COPY ./packages/common ./packages/common

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /app/packages/common

RUN yarn build

WORKDIR /app/packages/app

RUN yarn build

CMD yarn start:dev