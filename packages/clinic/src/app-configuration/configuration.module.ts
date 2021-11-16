import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envSchema } from './env.validation.schema';
import * as connectionOptions from './ormconfig';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      validationSchema: envSchema,
    }),
    TypeOrmModule.forRoot(connectionOptions),
  ],
})
export class ConfigurationModule {}
