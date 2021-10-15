import { Repository, EntityRepository } from 'typeorm';
import { SpecializationEntity } from './specializations.entity';

@EntityRepository(SpecializationEntity)
export class SpecializationsRepository extends Repository<SpecializationEntity> {
  async findById(id: number): Promise<SpecializationEntity> {
    return this.findOne({ id });
  }

  async findAll(): Promise<SpecializationEntity[]> {
    return this.find();
  }
}
