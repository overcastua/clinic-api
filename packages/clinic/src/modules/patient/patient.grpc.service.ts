import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IEmpty } from '@repos/common';
import { PatientService } from './patient.service';

@Controller('patient')
export class ClinicGRPCService {
  constructor(private readonly patientService: PatientService) {}

  @GrpcMethod()
  async createPatient({ userId }: { userId: number }): Promise<IEmpty> {
    console.log(userId);
    await this.patientService.create(userId);
    return {};
  }
}
