import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { QueueModule } from './queue/queue.module';
import { PatientModule } from './patient/patient.module';
import { ResolutionsModule } from './resolutions/resolutions.module';
import { ConfigurationModule } from '../app-configuration/configuration.module';
import { SpecializationsModule } from './specializations/specializations.module';
import { DoctorsModule } from './doctors/doctors.module';
import { jwtConstants, JwtStrategy } from '@repos/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    ConfigurationModule,
    QueueModule,
    PatientModule,
    ResolutionsModule,
    SpecializationsModule,
    DoctorsModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
