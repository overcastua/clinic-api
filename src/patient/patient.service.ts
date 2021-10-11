import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResolutionsEntity } from 'src/resolutions/resolutions.entity';
import { ResolutionsService } from 'src/resolutions/resolutions.service';
import { UsersEntity } from 'src/users/users.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
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

  async create(createPatientDto: CreatePatientDto): Promise<void> {
    await this.patientRepository.add(createPatientDto);
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

  // async findPatientIdByUserId(userId: number): Promise<PatientEntity> {
  //   const patient: PatientEntity =
  //     await this.patientRepository.findPatientIdByUserId(userId);

  //   if (!patient) throw new NotFoundException();

  //   return patient;
  // }

  async createResolution(dto: CreateResolutionDto, id: number): Promise<void> {
    const patient: PatientEntity = await this.findById(id);

    await this.resolutionsService.createResolution(dto, patient);
  }

  async getAllResolutionsById(id: number): Promise<ResolutionsEntity[]> {
    await this.findById(id);

    return this.resolutionsService.getAllById(id);
  }
}
