import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResolutionDto } from '../patient/dto/create-resolution.dto';
import { PatientEntity } from '../patient/patient.entity';
import { TimeHelper } from '@repos/common';
import { ResolutionsEntity } from './resolutions.entity';
import { ResolutionsRepository } from './resolutions.repository';

@Injectable()
export class ResolutionsService {
  constructor(
    @InjectRepository(ResolutionsRepository)
    private readonly resolutionsRepository: ResolutionsRepository,
  ) {}

  async getAllById(id: number): Promise<ResolutionsEntity[]> {
    const resolutions: ResolutionsEntity[] =
      await this.resolutionsRepository.getAllByPatientId(id);

    return resolutions;
  }

  async createResolution(
    dto: CreateResolutionDto,
    patient: PatientEntity,
  ): Promise<void> {
    const modDto = { ...dto } as any;

    modDto.expiresIn = new Date(
      TimeHelper.now() + TimeHelper.minToMs(dto.expiresIn),
    ).toISOString();

    return this.resolutionsRepository.createResolution(modDto, patient);
  }
}
