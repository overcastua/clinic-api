import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PatientService } from './patient.service';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async createPatient(
    @Body('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return this.patientService.create(userId);
  }
}
