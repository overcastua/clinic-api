import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResolutionDto } from '../patient/dto/create-resolution.dto';
import { TimeHelper } from '@repos/common';
import { ResolutionsEntity } from './resolutions.entity';
import { ResolutionsRepository } from './resolutions.repository';
import { DoctorEntity } from '../doctors/doctors.entity';
import { UpdateResolutionDto } from '../patient/dto/update-resolution.dto';

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
    doctor: DoctorEntity,
  ): Promise<void> {
    const modDto = { ...dto } as any;

    modDto.expiresIn = new Date(
      TimeHelper.now() + TimeHelper.minToMs(dto.expiresIn),
    ).toISOString();

    modDto.doctor = doctor;

    return this.resolutionsRepository.createResolution(modDto);
  }

  async updateResolution(dto: UpdateResolutionDto): Promise<void> {
    await this.resolutionsRepository.updateResolution(dto);
  }
}
