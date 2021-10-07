import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResolutionsEntity } from 'src/resolutions/resolutions.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { ReceivedResDto, ResDto } from './dto/create-resolution.dto';
import { PatientService } from './patient.service';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto): Promise<void> {
    return this.patientService.create(createPatientDto);
  }

  @Post(':patientName/resolutions')
  async createResolution(
    @Body() receievedDto: ReceivedResDto,
    @Param('patientName') name: string,
  ): Promise<void> {
    const dto = receievedDto as ResDto;
    dto.name = name;

    return this.patientService.createResolution(dto);
  }

  @Get(':patientName/resolutions')
  async getAllResolutionsByName(
    @Param('patientName') name: string,
  ): Promise<ResolutionsEntity[]> {
    return this.patientService.getAllResolutionsByName(name);
  }

  @Get(':patientName/resolutions/:resolutionId')
  async getResutionById(): Promise<string> {
    return 'a';
  }
}
