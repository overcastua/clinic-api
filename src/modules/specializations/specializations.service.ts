import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from '../doctors/doctors.entity';
import { DoctorsService } from '../doctors/doctors.service';
import { SpecializationEntity } from './specializations.entity';
import { SpecializationsRepository } from './specializations.repository';

@Injectable()
export class SpecializationsService {
  constructor(
    @InjectRepository(SpecializationsRepository)
    private readonly repository: SpecializationsRepository,
    private readonly doctorsService: DoctorsService,
  ) {}
  async getAllDoctorsOfCertainSpecialization(
    id: number,
  ): Promise<DoctorEntity[]> {
    const valid = await this.repository.findById(id);

    if (!valid) {
      throw new NotFoundException(
        'Specialization with the given id does not exist',
      );
    }

    return this.doctorsService.getAllDoctorsOfCertainSpecialization(id);
  }
  async getAll(): Promise<SpecializationEntity[]> {
    return this.repository.findAll();
  }
}
