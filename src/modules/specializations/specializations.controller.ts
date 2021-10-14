import { Controller, Get, Param } from '@nestjs/common';
import { DoctorEntity } from '../doctors/doctors.entity';
import { SpecValidateDto } from './dto/spec.validation.dto';
import { SpecializationEntity } from './specializations.entity';
import { SpecializationsService } from './specializations.service';

@Controller('specializations')
export class SpecializationsController {
  constructor(private readonly specsService: SpecializationsService) {}

  @Get(':specializationId/doctors')
  async getAllDoctors(
    @Param() params: SpecValidateDto,
  ): Promise<DoctorEntity[]> {
    return this.specsService.getAllDoctorsOfCertainSpecialization(
      params.specializationId,
    );
  }

  @Get()
  async getAll(): Promise<SpecializationEntity[]> {
    return this.specsService.getAll();
  }
}
