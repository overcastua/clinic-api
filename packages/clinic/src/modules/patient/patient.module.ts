import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from '../doctors/doctors.module';
import { ResolutionsModule } from '../resolutions/resolutions.module';
import { PatientController } from './patient.controller';
import { PatientRepository } from './patient.repository';
import { PatientService } from './patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientRepository]), ResolutionsModule],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
