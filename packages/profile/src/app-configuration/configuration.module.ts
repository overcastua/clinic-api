import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envSchema } from './env.validation.schema';
import * as TypeormAsyncConfiguration from './ormconfig';
import { CustomConfigModule } from '@repos/common';
import config from './config';

@Module({
  imports: [
    CustomConfigModule.register({
      awsParamStorePath: '/dev/',
      load: config,
    }),
    ConfigModule.forRoot({
      validationSchema: envSchema,
    }),
    TypeOrmModule.forRootAsync(TypeormAsyncConfiguration),
  ],
})
export class ConfigurationModule {}
