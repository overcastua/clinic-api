import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcGuard } from '@repos/common';
import { PatientService } from './patient.service';

@Controller('patient')
@UseGuards(GrpcGuard)
export class ClinicGRPCService {
  constructor(private readonly patientService: PatientService) {}

  @GrpcMethod()
  async createPatient({ userId }: { userId: number }): Promise<void> {
    return this.patientService.create(userId);
  }
}
