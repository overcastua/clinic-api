import { Repository, EntityRepository } from 'typeorm';
import { DoctorEntity } from './doctors.entity';

@EntityRepository(DoctorEntity)
export class DoctorsRepository extends Repository<DoctorEntity> {
  async getDoctorByUserId(userId: number): Promise<DoctorEntity> {
    return this.createQueryBuilder('doc')
      .innerJoinAndSelect('doc.queue', 'q')
      .where('doc.userId = :id', { id: userId })
      .getOne();
  }

  async getAllBySpecializationId(specId: number): Promise<DoctorEntity[]> {
    return this.createQueryBuilder('doc')
      .innerJoinAndSelect('doc.queue', 'q')
      .where('doc.specializationId = :id', { id: specId })
      .getMany();
  }

  async findDoctorByUserId(userId: number): Promise<DoctorEntity> {
    return this.findOne({ userId });
  }
}
