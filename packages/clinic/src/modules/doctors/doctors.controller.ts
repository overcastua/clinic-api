import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@repos/common';
import { CreateAppointmentDto } from '../appointments/dto/create-appointment.dto';
import { SpecializationEntity } from '../specializations/specializations.entity';
import { DoctorsService } from './doctors.service';
import { DoctorIdDto } from './validators/validate-id';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly service: DoctorsService) {}

  @Get('specializations') //(':doctorId/appointment')
  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    return this.service.getAllSpecializations();
  }

  @Get('me/appointment')
  async getClosestAppointment(@Req() req) {
    return this.service.getClosestAppointment(1);
  }

  @Post('me/next-appointment')
  async getNextAppointment(@Req() req) {
    return this.service.getNext(1);
  }

  @Post(':doctorId/appointment')
  async setUpAppointment(
    @Body() dto: CreateAppointmentDto,
    @Req() req,
    @Param() params: DoctorIdDto,
  ): Promise<void> {
    return this.service.createAppointment(dto, parseInt(params.doctorId), 1);
  }
}
