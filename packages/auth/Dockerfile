FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./aws.json ./

COPY ./packages/auth ./packages/auth
COPY ./packages/common ./packages/common

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /app/packages/common

RUN yarn build

WORKDIR /app/packages/auth

CMD yarn start:dev