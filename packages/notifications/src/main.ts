import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import {
  AWSClient,
  CloudWatchLogger,
  CustomConfigService,
} from '@repos/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const options: NestApplicationOptions = { cors: true, bufferLogs: true };

  const app = await NestFactory.create(AppModule, options);
  app.useLogger(app.get(CloudWatchLogger));

  const configuration = app.get(CustomConfigService);
  const port = configuration.get<number>('self.port');

  app.setGlobalPrefix(configuration.get<string>('self.prefix'));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Notifications API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', in: 'header', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  const kafkaOptions: MicroserviceOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configuration.get<string>('broker.uri')],
      },
    },
  };

  app.connectMicroservice<MicroserviceOptions>(kafkaOptions);
  await app.startAllMicroservices();

  await app.listen(port, () => {
    console.log('Notifications service is listening on port ' + port);
  });
}

AWSClient.instantiate();
bootstrap();
