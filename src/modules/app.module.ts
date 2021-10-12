import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { QueueModule } from './queue/queue.module';
import { PatientModule } from './patient/patient.module';
import { ResolutionsModule } from './resolutions/resolutions.module';
import { UsersModule } from './users/users.module';
import { ConfigurationModule } from '../app-configuration/configuration.module';
import { MeModule } from './me/me.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigurationModule,
    QueueModule,
    PatientModule,
    ResolutionsModule,
    UsersModule,
    AuthModule,
    MeModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
