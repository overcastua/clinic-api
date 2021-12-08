FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./

COPY ./packages/clinic ./packages/clinic
COPY ./packages/common ./packages/common

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /app/packages/common

RUN yarn build

WORKDIR /app/packages/clinic

CMD yarn start:dev