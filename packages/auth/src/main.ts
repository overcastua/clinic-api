import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { CloudWatchLogger, configureGRPC, AWSClient } from '@repos/common';

async function bootstrap() {
  const logger = new CloudWatchLogger();
  const options = { cors: true, logger };

  const app = await NestFactory.create(AppModule, options);
  const configuration = app.get(ConfigService);
  const port = configuration.get('port');
  const mode = configuration.get('mode');

  AWSClient.instantiate(mode);
  await logger.init(mode, 'auth');

  app.setGlobalPrefix(configuration.get('prefix'));
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('The Medical Service AUTH API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', in: 'header', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  const grpcConfig = configureGRPC(configuration.get('GRPC.auth'), 'auth');

  app.connectMicroservice<MicroserviceOptions>(grpcConfig);
  await app.startAllMicroservices();

  await app.listen(port, () => {
    console.log('Auth service is listening on port ' + port);
  });
}

bootstrap();
