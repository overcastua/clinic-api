import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PatientService } from './patient.service';

@Controller('patient')
export class ClinicGRPCService {
  constructor(private readonly patientService: PatientService) {}

  @GrpcMethod()
  async createPatient({ userId }: { userId: number }): Promise<void> {
    return this.patientService.create(userId);
  }
}
