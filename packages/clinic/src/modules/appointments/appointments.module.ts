import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from '../patient/patient.module';
import { TimeSlotsRepository } from './slots/slots.repository';
import { TimeSlotsService } from './slots/slots.service';
import { WorkdaysRepository } from './workdays.repository';
import { AppointmentsService } from './appointments.service';

@Module({
  imports: [
    forwardRef(() => PatientModule),
    TypeOrmModule.forFeature([WorkdaysRepository, TimeSlotsRepository]),
  ],
  providers: [AppointmentsService, TimeSlotsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
