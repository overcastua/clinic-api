import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from '../doctors/doctors.module';
import { SpecializationsController } from './specializations.controller';
import { SpecializationsRepository } from './specializations.repository';
import { SpecializationsService } from './specializations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecializationsRepository]),
    DoctorsModule,
  ],
  controllers: [SpecializationsController],
  providers: [SpecializationsService],
})
export class SpecializationsModule {}
