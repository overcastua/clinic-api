import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResolutionsEntity } from 'src/modules/resolutions/resolutions.entity';
import { ResolutionsService } from 'src/modules/resolutions/resolutions.service';
import { UsersEntity } from 'src/modules/users/users.entity';
import { ProfileService } from '../profile/profile.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { PatientEntity } from './patient.entity';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientRepository)
    private readonly patientRepository: PatientRepository,
    private readonly profileService: ProfileService,
    private readonly resolutionsService: ResolutionsService,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<void> {
    createPatientDto.patient = await this.patientRepository.add(
      createPatientDto,
    );
    await this.profileService.create(createPatientDto);
  }

  async findById(id: number): Promise<PatientEntity> {
    const patient: PatientEntity = await this.patientRepository.findById(id);

    if (!patient) throw new NotFoundException();

    return patient;
  }

  async findPatientByUser(user: UsersEntity): Promise<PatientEntity> {
    const patient: PatientEntity =
      await this.patientRepository.findPatientByUser(user);

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
