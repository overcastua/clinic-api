import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResolutionsEntity } from '../resolutions/resolutions.entity';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@repos/common';
import { PatientService } from './patient.service';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async createPatient(@Body() { userId }: { userId: string }): Promise<void> {
    return this.patientService.create(parseInt(userId));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('me/resolutions')
  @Roles(Role.PATIENT)
  @ApiOperation({ summary: 'Get own resolutions' })
  @ApiOkResponse({
    description:
      'Patient was successfully authenticated, returns a resolutions list',
    type: [ResolutionsEntity],
  })
  @ApiNotFoundResponse({
    description:
      'Patient was successfully authenticated but no resolutions were found',
  })
  @ApiUnauthorizedResponse({
    description: 'Patient can not be authenticated',
  })
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async getResolutions(@Req() req): Promise<ResolutionsEntity[]> {
    return this.patientService.getOwnResolutions(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @ApiForbiddenResponse({
    description: 'You dont have permission to access the route',
  })
  async getAllResolutionsById(
    @Param('id') id: number,
  ): Promise<ResolutionsEntity[]> {
    return this.patientService.getAllResolutionsById(id);
  }
}
