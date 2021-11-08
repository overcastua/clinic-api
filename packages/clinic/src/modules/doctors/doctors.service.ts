import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecializationEntity } from './specializations/specializations.entity';
import { SpecializationsService } from './specializations/specializations.service';
import { DoctorEntity } from './doctors.entity';
import { DoctorsRepository } from './doctors.repository';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorsRepository)
    private readonly repository: DoctorsRepository,
    private readonly specService: SpecializationsService,
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
}
