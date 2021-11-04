import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { ResolutionsEntity } from '../resolutions/resolutions.entity';
import { ResolutionsService } from '../resolutions/resolutions.service';

import { PatientEntity } from './patient.entity';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientRepository)
    private readonly patientRepository: PatientRepository,
    private readonly resolutionsService: ResolutionsService,
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

  async getOwnResolutions(userId: number): Promise<ResolutionsEntity[]> {
    const patient = await this.patientRepository.findPatientByUserId(userId);

    return this.resolutionsService.getAllById(patient.id);
  }

  // async createResolution(
  //   dto: CreateResolutionDto,
  //   id: number,
  //   doctorUserId: number,
  // ): Promise<void> {
  //   const patient: PatientEntity = await this.findPatientByUserId(id);

  //   const doctor: DoctorEntity = await this.doctorsService.findDoctorByUserId(
  //     doctorUserId,
  //   );

  //   await this.resolutionsService.createResolution(dto, patient, doctor);
  // }

  // async getAllResolutionsById(id: number): Promise<ResolutionsEntity[]> {
  //   const patient = await this.findPatientByUserId(id);

  //   return this.resolutionsService.getAllById(patient.id);
  // }
}
