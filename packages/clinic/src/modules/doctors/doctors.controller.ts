import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
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
import { CreateResolutionDto } from '../patient/dto/create-resolution.dto';
import { UpdateResolutionDto } from '../patient/dto/update-resolution.dto';
import { SpecializationEntity } from '../specializations/specializations.entity';
import { DoctorsService } from './doctors.service';

@ApiTags('doctors')
@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorsController {
  constructor(private readonly service: DoctorsService) {}

  @Get('specializations')
  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    return this.service.getAllSpecializations();
  }

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

  @Patch(':resolutions')
  @Roles(Role.DOCTOR)
  async updateResolution(
    @Body() dto: UpdateResolutionDto,
    @Req() req,
  ): Promise<void> {
    return this.service.updateResolution(dto, req.user.userId);
  }
}
