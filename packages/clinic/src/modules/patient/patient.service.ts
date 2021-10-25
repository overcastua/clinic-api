import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from '@repos/common';
import { ResolutionsEntity } from 'src/modules/resolutions/resolutions.entity';
import { ResolutionsService } from 'src/modules/resolutions/resolutions.service';
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

  async findById(id: number): Promise<PatientEntity> {
    const patient: PatientEntity = await this.patientRepository.findById(id);

    if (!patient) throw new NotFoundException();

    return patient;
  }

  async findPatientByUser(userId: number): Promise<PatientEntity> {
    const patient: PatientEntity =
      await this.patientRepository.findPatientByUser(userId);

    if (!patient) throw new NotFoundException();

    return patient;
  }

  async getOwnResolutions(patientId: number): Promise<ResolutionsEntity[]> {
    return this.resolutionsService.getAllById(patientId);
  }

  async createResolution(dto: CreateResolutionDto, id: number): Promise<void> {
    const patient: PatientEntity = await this.findById(id);

    await this.resolutionsService.createResolution(dto, patient);
  }

  async getAllResolutionsById(id: number): Promise<ResolutionsEntity[]> {
    await this.findById(id);

    return this.resolutionsService.getAllById(id);
  }
}
