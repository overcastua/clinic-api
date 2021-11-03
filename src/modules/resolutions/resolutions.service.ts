import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResolutionDto } from 'src/modules/patient/dto/create-resolution.dto';
import { PatientEntity } from 'src/modules/patient/patient.entity';
import { TimeHelper } from 'src/utils/timeHelper';
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

    if (!resolutions.length) throw new NotFoundException();

    return resolutions;
  }

  async createResolution(
    dto: CreateResolutionDto,
    patient: PatientEntity,
  ): Promise<void> {
    const modDto = { ...dto } as any;

    modDto.expires_in = new Date(
      TimeHelper.now() + TimeHelper.minToMs(dto.expires_in),
    ).toISOString();

    return this.resolutionsRepository.createResolution(modDto, patient);
  }
}
