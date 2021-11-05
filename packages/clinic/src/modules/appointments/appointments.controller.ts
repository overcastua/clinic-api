import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@repos/common';
import { DoctorIdDto } from '../doctors/validators/validate-id';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { TimeSlotsEntity } from './slots/slots.entity';

@ApiTags('appointments')
@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @Get('patients/me')
  @Roles(Role.PATIENT)
  async getAllAppointments(@Req() req): Promise<TimeSlotsEntity[]> {
    return this.service.patientGetAllAppointments(req.user.userId);
  }

  @Get('doctors/me/current')
  @Roles(Role.DOCTOR)
  async getClosestAppointment(@Req() req) {
    return this.service.doctorGetClosest(req.user.userId);
  }

  @Post('doctors/me/next')
  @Roles(Role.DOCTOR)
  async getNextAppointment(@Req() req) {
    return this.service.doctorGetNext(req.user.userId);
  }

  @Get('doctors/me')
  @Roles(Role.DOCTOR)
  async getAllFutureAppointments(@Req() req) {
    return this.service.doctorGetAllFutureAppointments(req.user.userId);
  }

  @Get('doctors/:doctorId/all')
  @Roles(Role.PATIENT)
  async getAllAppointmentSlotsForDate(@Query() query, @Param() param) {
    return this.service.getAllForDate(param.doctorId, query.date);
  }

  @Get('doctors/:doctorId/days')
  async getAllWorkdaysNext7days(@Param() param) {
    return this.service.getAllWorkdaysNext7days(param.doctorId);
  }

  @Post('doctors/:doctorId')
  @Roles(Role.PATIENT)
  async setUpAppointment(
    @Body() dto: CreateAppointmentDto,
    @Req() req,
    @Param() params: DoctorIdDto,
  ): Promise<void> {
    return this.service.createAppointment(
      dto,
      parseInt(params.doctorId),
      req.user.userId,
    );
  }
}
