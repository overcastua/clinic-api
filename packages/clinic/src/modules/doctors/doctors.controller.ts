import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@repos/common';

import { SpecializationEntity } from './specializations/specializations.entity';
import { DoctorsService } from './doctors.service';

@ApiTags('doctors')
@Controller('doctors')
@UseGuards(JwtAuthGuard)
export class DoctorsController {
  constructor(private readonly service: DoctorsService) {}

  @Get('specializations')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all specializations' })
  @ApiOkResponse({
    description: 'Returns specializations list',
  })
  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    return this.service.getAllSpecializations();
  }
}
