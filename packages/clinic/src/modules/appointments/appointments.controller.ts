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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @Get('patients/me')
  @Roles(Role.PATIENT)
  @ApiOperation({ summary: 'Get your appointments as a patient' })
  @ApiOkResponse({
    description: 'Returns list of appointments',
  })
  @ApiUnauthorizedResponse({
    description:
      'Either the authorization header is empty or the bearer token is malformed',
  })
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async getAllAppointments(@Req() req): Promise<TimeSlotsEntity[]> {
    return this.service.patientGetAllAppointments(req.user.userId);
  }

  @Get('doctors/me/current')
  @Roles(Role.DOCTOR)
  @ApiOperation({ summary: 'Get the closest appointment as a doctor' })
  @ApiOkResponse({
    description: 'Returns the closest appointment',
  })
  @ApiNotFoundResponse({ description: 'No appointments found' })
  @ApiUnauthorizedResponse({
    description:
      'Either the authorization header is empty or the bearer token is malformed',
  })
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async getClosestAppointment(@Req() req) {
    return this.service.doctorGetClosest(req.user.userId);
  }

  @Post('doctors/me/next')
  @Roles(Role.DOCTOR)
  @ApiOperation({
    summary: 'Get next closest appointment and set current as finished',
  })
  @ApiOkResponse({
    description: 'Returns the next closest appointment',
  })
  @ApiNotFoundResponse({ description: 'No appointments found' })
  @ApiUnauthorizedResponse({
    description:
      'Either the authorization header is empty or the bearer token is malformed',
  })
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async getNextAppointment(@Req() req) {
    return this.service.doctorGetNext(req.user.userId);
  }

  @Get('doctors/me')
  @Roles(Role.DOCTOR)
  @ApiOperation({ summary: 'Get all future appointments as a doctor' })
  @ApiOkResponse({
    description: 'Returns list of all future appointments',
  })
  @ApiUnauthorizedResponse({
    description:
      'Either the authorization header is empty or the bearer token is malformed',
  })
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async getAllFutureAppointments(@Req() req) {
    return this.service.doctorGetAllFutureAppointments(req.user.userId);
  }

  @Get('doctors/:doctorId/all')
  @Roles(Role.PATIENT)
  @ApiOperation({
    summary: 'Get all time slots of a doctor for a certain date',
  })
  @ApiOkResponse({
    description: 'Returns list of all the slots',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined schema',
  })
  @ApiUnauthorizedResponse({
    description:
      'Either the authorization header is empty or the bearer token is malformed',
  })
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async getAllAppointmentSlotsForDate(
    @Query('date', DateValidationPipe) date: Date,
    @Param('doctorId', ParseIntPipe) doctorId: number,
  ) {
    return this.service.getAllForDate(doctorId, date);
  }

  @Get('doctors/:doctorId/days')
  @ApiOperation({
    summary: 'Get all time slots of a doctor for the next week',
  })
  @ApiOkResponse({
    description: 'Returns list of all the slots',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined schema',
  })
  @ApiUnauthorizedResponse({
    description:
      'Either the authorization header is empty or the bearer token is malformed',
  })
  async getAllWorkdaysNext7days(
    @Param('doctorId', ParseIntPipe) doctorId: number,
  ) {
    return this.service.getAllWorkdaysNext7days(doctorId);
  }

  @Post('doctors/:doctorId')
  @Roles(Role.PATIENT)
  @ApiOperation({
    summary: 'Set up a new appointment with a certain doctor',
  })
  @ApiCreatedResponse({
    description: 'Appointment was successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined schema',
  })
  @ApiUnauthorizedResponse({
    description:
      'Either the authorization header is empty or the bearer token is malformed',
  })
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async setUpAppointment(
    @Body() dto: CreateAppointmentDto,
    @Req() req,
    @Param('doctorId', ParseIntPipe) doctorId: number,
  ): Promise<void> {
    return this.service.createAppointment(dto, doctorId, req.user.userId);
  }
}
