import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { SpecializationsRepository } from './specializations.repository';

@Injectable()
export class SpecializationsService {
  constructor(
    @InjectRepository(SpecializationsRepository)
    private readonly repository: SpecializationsRepository,
    private readonly doctorsService: DoctorsService,
  ) {}
  async getAllDoctorsOfCertainSpecialization(id: number) {
    const valid = await this.repository.findById(id);

    if (!valid) {
      throw new NotFoundException(
        'Specialization with the given id does not exist',
      );
    }

    return this.doctorsService.getAllDoctorsOfCertainSpecialization(id);
  }
  async getAll() {
    return this.repository.findAll();
  }
}
