import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PatientService } from './patient.service';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create new patient' })
  @ApiCreatedResponse({
    description: 'Patient was successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined schema',
  })
  async createPatient(
    @Body('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return this.patientService.create(userId);
  }
}
