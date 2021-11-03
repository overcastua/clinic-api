import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DoctorEntity } from '../doctors/doctors.entity';
import { SpecValidateDto } from './dto/spec.validation.dto';
import { SpecializationEntity } from './specializations.entity';
import { SpecializationsService } from './specializations.service';

@ApiTags('specializations')
@Controller('specializations')
export class SpecializationsController {
  constructor(private readonly specsService: SpecializationsService) {}

  @Get(':specializationId/doctors')
  @ApiOperation({ summary: 'Get all the doctors of a certain specialization' })
  @ApiOkResponse({
    description: 'Returns the list of doctors',
    type: [DoctorEntity],
  })
  async getAllDoctors(
    @Param() params: SpecValidateDto,
  ): Promise<DoctorEntity[]> {
    return this.specsService.getAllDoctorsOfCertainSpecialization(
      params.specializationId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get list of all the specializations' })
  @ApiOkResponse({
    description: 'Returns the list of specializations',
    type: [SpecializationEntity],
  })
  async getAll(): Promise<SpecializationEntity[]> {
    return this.specsService.getAll();
  }
}
