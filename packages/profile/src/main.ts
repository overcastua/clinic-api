import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  CloudWatchLogger,
  configureGRPC,
  CustomConfigService,
} from '@repos/common';

async function bootstrap() {
  const options: NestApplicationOptions = { cors: true, bufferLogs: true };

  const app = await NestFactory.create(AppModule, options);
  app.useLogger(app.get(CloudWatchLogger));

  const configuration = app.get(CustomConfigService);
  const port = configuration.get<number>('port');

  app.setGlobalPrefix(configuration.get<string>('prefix'));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('The Medical Service PROFILE API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', in: 'header', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  const grpcConfig = configureGRPC(
    configuration.get<string>('GRPC.profile'),
    'profile',
  );

  app.connectMicroservice<MicroserviceOptions>(grpcConfig);
  await app.startAllMicroservices();

  await app.listen(port, () => {
    console.log('Profile service is listening on port ' + port);
  });
}

bootstrap();
