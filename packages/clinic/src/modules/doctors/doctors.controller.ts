import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@repos/common';

import { SpecializationEntity } from './specializations/specializations.entity';
import { DoctorsService } from './doctors.service';

@ApiTags('doctors')
@Controller('doctors')
@UseGuards(JwtAuthGuard)
export class DoctorsController {
  constructor(private readonly service: DoctorsService) {}

  @Get('specializations')
  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    return this.service.getAllSpecializations();
  }
}
