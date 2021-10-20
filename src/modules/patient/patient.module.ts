import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResolutionsModule } from 'src/modules/resolutions/resolutions.module';
import { ProfileModule } from '../profile/profile.module';
import { PatientController } from './patient.controller';
import { PatientRepository } from './patient.repository';
import { PatientService } from './patient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientRepository]),
    ResolutionsModule,
    ProfileModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
