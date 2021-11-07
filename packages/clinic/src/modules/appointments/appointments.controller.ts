import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  DateValidationPipe,
  JwtAuthGuard,
  Role,
  Roles,
  RolesGuard,
} from '@repos/common';
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
  async getAllAppointmentSlotsForDate(
    @Query('date', DateValidationPipe) date: Date,
    @Param('doctorId', ParseIntPipe) doctorId: number,
  ) {
    return this.service.getAllForDate(doctorId, date);
  }

  @Get('doctors/:doctorId/days')
  async getAllWorkdaysNext7days(
    @Param('doctorId', ParseIntPipe) doctorId: number,
  ) {
    return this.service.getAllWorkdaysNext7days(doctorId);
  }

  @Post('doctors/:doctorId')
  @Roles(Role.PATIENT)
  async setUpAppointment(
    @Body() dto: CreateAppointmentDto,
    @Req() req,
    @Param('doctorId', ParseIntPipe) doctorId: number,
  ): Promise<void> {
    return this.service.createAppointment(dto, doctorId, req.user.userId);
  }
}
