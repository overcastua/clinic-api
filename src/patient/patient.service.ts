import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResolutionsEntity } from 'src/resolutions/resolutions.entity';
import { ResolutionsService } from 'src/resolutions/resolutions.service';
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
    const patient: PatientEntity = await this.patientRepository.findByName(
      createPatientDto.name,
    );

    if (patient) throw new ConflictException();

    await this.patientRepository.add(createPatientDto);
  }

  async findByName(name: string): Promise<PatientEntity> {
    const patient: PatientEntity = await this.patientRepository.findByName(
      name,
    );

    if (!patient) throw new NotFoundException();

    return patient;
  }

  async createResolution(
    dto: CreateResolutionDto,
    name: string,
  ): Promise<void> {
    const patient: PatientEntity = await this.findByName(name);

    await this.resolutionsService.createResolution(dto, patient);
  }

  async getAllResolutionsByName(name: string): Promise<ResolutionsEntity[]> {
    return this.resolutionsService.getAllByName(name);
  }
}
