import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PatientEntity } from './patient.entity';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientRepository)
    private readonly patientRepository: PatientRepository,
  ) {}

  async create(userId: number): Promise<void> {
    await this.patientRepository.add(userId);
  }

  async findPatientByUserId(userId: number): Promise<PatientEntity> {
    const patient: PatientEntity =
      await this.patientRepository.findPatientByUserId(userId);

    if (!patient) {
      throw new NotFoundException('Patient does not exist');
    }

    return patient;
  }
}
