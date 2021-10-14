import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResolutionsEntity } from 'src/modules/resolutions/resolutions.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Role } from '../users/dto/login-user.dto';
import { Roles } from '../users/users.roles.decorator';
import { RolesGuard } from '../users/users.roles.guard';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { PatientService } from './patient.service';

@ApiTags('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post(':id/resolutions')
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
  async createResolution(
    @Body() dto: CreateResolutionDto,
    @Param('id') id: number,
  ): Promise<void> {
    return this.patientService.createResolution(dto, id);
  }

  @Get(':id/resolutions')
  @Roles(Role.DOCTOR)
  @ApiOperation({ summary: 'Get all the resolutions of a certain patient' })
  @ApiOkResponse({
    description: 'Returns all the resolutions for the patient',
    type: [ResolutionsEntity],
  })
  @ApiNotFoundResponse({
    description: 'Patient with the given id was not found',
  })
  async getAllResolutionsById(
    @Param('id') id: number,
  ): Promise<ResolutionsEntity[]> {
    return this.patientService.getAllResolutionsById(id);
  }
}
