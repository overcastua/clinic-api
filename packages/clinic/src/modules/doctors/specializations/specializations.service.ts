import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecializationEntity } from './specializations.entity';
import { SpecializationsRepository } from './specializations.repository';

@Injectable()
export class SpecializationsService {
  constructor(
    @InjectRepository(SpecializationsRepository)
    private readonly repository: SpecializationsRepository,
  ) {}

  async getAll(): Promise<SpecializationEntity[]> {
    return this.repository.findAll();
  }
}
