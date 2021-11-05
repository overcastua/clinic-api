import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@repos/common';
import { CreateAppointmentDto } from '../appointments/dto/create-appointment.dto';
import { CreateResolutionDto } from '../patient/dto/create-resolution.dto';
import { UpdateResolutionDto } from '../patient/dto/update-resolution.dto';
import { SpecializationEntity } from '../specializations/specializations.entity';
import { DoctorsService } from './doctors.service';
import { DoctorIdDto } from './validators/validate-id';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly service: DoctorsService) {}

  @Get('specializations')
  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    return this.service.getAllSpecializations();
  }

  @Get('me/appointment')
  async getClosestAppointment(@Req() req) {
    return this.service.getClosestAppointment(1);
  }

  @Get('me/appointments')
  async getAllFutureAppointments(@Req() req) {
    return this.service.getAllFutureAppointments(1);
  }

  @Post('me/next-appointment')
  async getNextAppointment(@Req() req) {
    return this.service.getNext(1);
  }

  @Get(':doctorId/appointments')
  async getAllAppointmentSlotsForDate(@Query() query, @Param() param) {
    return this.service.getAllTimeSlots(param.doctorId, query.date);
  }

  @Get(':doctorId/appointment-days')
  async getAllWorkdaysNext7days(@Param() param) {
    return this.service.getAllWorkdaysNext7days(param.doctorId);
  }

  @Post(':doctorId/appointment')
  async setUpAppointment(
    @Body() dto: CreateAppointmentDto,
    @Req() req,
    @Param() params: DoctorIdDto,
  ): Promise<void> {
    return this.service.createAppointment(dto, parseInt(params.doctorId), 1);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':resolutions')
  @Roles(Role.DOCTOR)
  @ApiOperation({ summary: 'Create a new resolution for the patient' })
  @ApiCreatedResponse({
    description: 'Resolution was successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined DTO schema',
  })
  @ApiNotFoundResponse({
    description: 'Patient with the given id was not found',
  })
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async createResolution(
    @Body() dto: CreateResolutionDto,
    @Req() req,
  ): Promise<void> {
    return this.service.createResolution(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':resolutions')
  @Roles(Role.DOCTOR)
  async updateResolution(@Body() dto: UpdateResolutionDto): Promise<void> {
    return this.service.updateResolution(dto);
  }
}
