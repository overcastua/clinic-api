import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';
import { LambdaNotifierCQRSModule } from './src/lambdaNotifier/lambda.module';
import { CommandBus } from '@nestjs/cqrs';
import { FetchParamCommand } from './src/lambdaNotifier/commands/Impl/fetch-param.command';

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(LambdaNotifierCQRSModule, adapter);
  const commandBus = app.get(CommandBus);

  app.enableCors();
  await app.init();

  await commandBus.execute(new FetchParamCommand());
  return awsServerlessExpress.createServer(expressApp);
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
    .promise;
};
