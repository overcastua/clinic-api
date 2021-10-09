import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResolutionsEntity } from 'src/resolutions/resolutions.entity';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { PatientService } from './patient.service';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post(':id/resolutions')
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
  @ApiOperation({ summary: 'Get all the resolutions of a certain patient' })
  @ApiOkResponse({
    description: 'Returns all the resolutions for the patient',
    type: [ResolutionsEntity],
  })
  @ApiNotFoundResponse({
    description: 'Patient with the given id was not found',
  })
  async getAllResolutionsByName(
    @Param('id') id: number,
  ): Promise<ResolutionsEntity[]> {
    return this.patientService.getAllResolutionsById(id);
  }
}
