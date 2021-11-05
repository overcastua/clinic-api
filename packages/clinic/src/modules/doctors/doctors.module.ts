import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from '../appointments/appointments.module';
import { ResolutionsModule } from '../resolutions/resolutions.module';
import { SpecializationsModule } from '../specializations/specializations.module';
import { DoctorsController } from './doctors.controller';
import { DoctorsRepository } from './doctors.repository';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorsRepository]),
    SpecializationsModule,
    ResolutionsModule,
  ],
  providers: [DoctorsService],
  controllers: [DoctorsController],
  exports: [DoctorsService],
})
export class DoctorsModule {}
