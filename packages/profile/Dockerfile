FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./

COPY ./packages/profile ./packages/profile
COPY ./packages/common ./packages/common

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /app/packages/common

RUN yarn build

WORKDIR /app/packages/profile

CMD yarn start:dev