import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from '@repos/common';
import { ResolutionsEntity } from '../resolutions/resolutions.entity';
import { ResolutionsService } from '../resolutions/resolutions.service';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { PatientEntity } from './patient.entity';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientRepository)
    private readonly patientRepository: PatientRepository,
    private readonly resolutionsService: ResolutionsService,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<void> {
    await this.patientRepository.add(createProfileDto);
  }

  async findPatientByUserId(userId: number): Promise<PatientEntity> {
    const patient: PatientEntity =
      await this.patientRepository.findPatientByUserId(userId);

    if (!patient) throw new NotFoundException();

    return patient;
  }

  async getOwnResolutions(userId: number): Promise<ResolutionsEntity[]> {
    const patient = await this.patientRepository.findPatientByUserId(userId);

    return this.resolutionsService.getAllById(patient.id);
  }

  async createResolution(dto: CreateResolutionDto, id: number): Promise<void> {
    const patient: PatientEntity = await this.findPatientByUserId(id);

    await this.resolutionsService.createResolution(dto, patient);
  }

  async getAllResolutionsById(id: number): Promise<ResolutionsEntity[]> {
    const patient = await this.findPatientByUserId(id);

    return this.resolutionsService.getAllById(patient.id);
  }
}
