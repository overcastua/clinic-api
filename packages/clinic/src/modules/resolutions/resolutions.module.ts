import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientModule } from '../patient/patient.module';
import { ResolutionsController } from './resolutions.controller';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsService } from './resolutions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResolutionsRepository]),
    PatientModule,
    DoctorsModule,
  ],
  providers: [ResolutionsService],
  controllers: [ResolutionsController],
})
export class ResolutionsModule {}
