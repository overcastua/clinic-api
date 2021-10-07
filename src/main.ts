import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const options = { cors: true };
  const app = await NestFactory.create(AppModule, options);
  app.setGlobalPrefix('api/v1');

  await app.listen(8080);
}

bootstrap();
