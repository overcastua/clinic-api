import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicGRPCService } from './patient.grpc.service';
import { PatientRepository } from './patient.repository';
import { PatientService } from './patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientRepository])],
  controllers: [ClinicGRPCService],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
