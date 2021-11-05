import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkdaysRepository } from './workdays.repository';
import { AppointmentsService } from './appointments.service';
import { ProfileModule } from '../profile/profile.module';
import { SlotsModule } from './slots/slots.module';
import { AppointmentsController } from './appointments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkdaysRepository]),
    SlotsModule,
    ProfileModule,
  ],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
