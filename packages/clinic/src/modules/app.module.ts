import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { QueueModule } from './queue/queue.module';
import { PatientModule } from './patient/patient.module';
import { ResolutionsModule } from './resolutions/resolutions.module';
import { ConfigurationModule } from '../app-configuration/configuration.module';
import { SpecializationsModule } from './specializations/specializations.module';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [
    ConfigurationModule,
    QueueModule,
    PatientModule,
    ResolutionsModule,
    SpecializationsModule,
    DoctorsModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
