import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from 'src/modules/patient/patient.module';
import { TimeSlotsRepository } from './slots.repository';
import { TimeSlotsService } from './slots.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlotsRepository]), PatientModule],
  providers: [TimeSlotsService],
  exports: [TimeSlotsService],
})
export class SlotsModule {}
