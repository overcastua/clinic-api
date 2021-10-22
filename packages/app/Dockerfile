FROM node:16-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN yarn install

COPY . /app
