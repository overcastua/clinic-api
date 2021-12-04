import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envSchema } from './env.validation.schema';
import * as TypeormAsyncConfiguration from './ormconfig';
import config from './config';
import { CustomConfigModule } from '@repos/common';

@Module({
  imports: [
    CustomConfigModule.forRoot({
      awsParamStorePaths: ['/dev/', '/auth/'],
      load: config,
    }),
    ConfigModule.forRoot({
      validationSchema: envSchema,
    }),
    TypeOrmModule.forRootAsync(TypeormAsyncConfiguration),
  ],
})
export class ConfigurationModule {}
