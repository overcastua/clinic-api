import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { TimeSlotsEntity } from './slots/slots.entity';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @Get('me')
  async getAllAppointments(): Promise<TimeSlotsEntity[]> {
    return this.service.patientGetAllAppointments(1);
  }
}
