import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { test } from '@repos/common';

async function bootstrap() {
  const options = { cors: true };
  const app = await NestFactory.create(AppModule, options);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  console.log(test());

  const config = new DocumentBuilder()
    .setTitle('The Medical Service API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', in: 'header', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(process.env.APP_PORT);
}

bootstrap();
