import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envSchema } from './env.validation.schema';
import * as TypeormAsyncConfiguration from './ormconfig';
import config from './config';
import { CloudWatchLogger, CustomConfigModule } from '@repos/common';

@Module({
  imports: [
    CustomConfigModule.forRoot({
      awsParamStorePaths: ['/dev/', '/auth/'],
      load: config,
      validationSchema: envSchema,
    }),
    TypeOrmModule.forRootAsync(TypeormAsyncConfiguration),
  ],
  providers: [
    {
      provide: CloudWatchLogger,
      useValue: new CloudWatchLogger('dev', 'auth'),
    },
  ],
  exports: [CloudWatchLogger],
})
export class ConfigurationModule {}
