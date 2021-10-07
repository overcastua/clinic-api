import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResolutionsEntity } from 'src/resolutions/resolutions.entity';
import { ResolutionsService } from 'src/resolutions/resolutions.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import {
  ModifiedCreateResolutionDto,
  ResDto,
} from './dto/create-resolution.dto';
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

  async findByName(name: string): Promise<PatientEntity> {
    return this.patientRepository.findByName(name);
  }

  async createResolution(dto: ResDto) {
    const patient: PatientEntity = await this.patientRepository.findByName(
      dto.name,
    );
    const modDto = new ModifiedCreateResolutionDto();
    modDto.expires_on = dto.expires_on;
    modDto.text = dto.text;
    modDto.patient = patient;
    await this.resolutionsService.createResolution(modDto);
  }

  async getAllResolutionsByName(name: string): Promise<ResolutionsEntity[]> {
    return this.resolutionsService.getAllByName(name);
  }
}
