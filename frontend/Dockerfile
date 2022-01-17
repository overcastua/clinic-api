FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./

RUN yarn install --pure-lockfile --non-interactive

COPY . .

CMD [ "node", "server.js" ]
