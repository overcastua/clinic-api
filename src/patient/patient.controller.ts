import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResolutionsEntity } from 'src/resolutions/resolutions.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { PatientService } from './patient.service';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({
    status: 201,
    description: 'Patient was successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Received data violates predefined DTO schema',
  })
  async create(@Body() createPatientDto: CreatePatientDto): Promise<void> {
    return this.patientService.create(createPatientDto);
  }

  @Post(':id/resolutions')
  @ApiOperation({ summary: 'Create a new resolution for the patient' })
  @ApiResponse({
    status: 201,
    description: 'Resolution was successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Received data violates predefined DTO schema',
  })
  @ApiResponse({
    status: 404,
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
  @ApiResponse({
    status: 200,
    description: 'Returns all the resolutions for the patient',
    type: Array,
  })
  @ApiResponse({
    status: 404,
    description: 'Patient with the given id was not found',
  })
  async getAllResolutionsByName(
    @Param('id') id: number,
  ): Promise<ResolutionsEntity[]> {
    return this.patientService.getAllResolutionsById(id);
  }

  // @Get(':patientId/resolutions/:resolutionId')
  // async getResutionById(): Promise<string> {
  //   return 'a';
  // }
}
