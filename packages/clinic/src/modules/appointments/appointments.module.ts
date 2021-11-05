import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkdaysRepository } from './workdays.repository';
import { AppointmentsService } from './appointments.service';
import { ProfileModule } from '../profile/profile.module';
import { SlotsModule } from './slots/slots.module';
import { AppointmentsController } from './appointments.controller';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkdaysRepository]),
    SlotsModule,
    ProfileModule,
    DoctorsModule,
  ],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
