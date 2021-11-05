import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateResolutionDto } from '../patient/dto/create-resolution.dto';
import { UpdateResolutionDto } from '../patient/dto/update-resolution.dto';
import { ResolutionsService } from '../resolutions/resolutions.service';
import { SpecializationEntity } from '../specializations/specializations.entity';
import { SpecializationsService } from '../specializations/specializations.service';
import { DoctorEntity } from './doctors.entity';
import { DoctorsRepository } from './doctors.repository';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorsRepository)
    private readonly repository: DoctorsRepository,
    private readonly specService: SpecializationsService,
    private readonly resolutionsService: ResolutionsService,
  ) {}

  async findDoctorByUserId(userId: number): Promise<DoctorEntity> {
    const doctor: DoctorEntity = await this.repository.findDoctorByUserId(
      userId,
    );

    if (!doctor)
      throw new NotFoundException('Doctor with this userId does not exist');

    return doctor;
  }

  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    return this.specService.getAll();
  }

  async createResolution(dto: CreateResolutionDto, id: number): Promise<void> {
    const doctor: DoctorEntity = await this.findDoctorByUserId(id);

    await this.resolutionsService.createResolution(dto, doctor);
  }

  async updateResolution(
    dto: UpdateResolutionDto,
    userId: number,
  ): Promise<void> {
    const doctor: DoctorEntity = await this.findDoctorByUserId(userId);
    await this.resolutionsService.updateResolution(dto, doctor.id);
  }
}
