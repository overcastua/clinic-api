import { CreateProfileDto } from '@repos/common';
import { EntityRepository, Repository } from 'typeorm';
import { PatientEntity } from './patient.entity';

@EntityRepository(PatientEntity)
export class PatientRepository extends Repository<PatientEntity> {
  async add(createProfileDto: CreateProfileDto): Promise<PatientEntity> {
    const newPatient = new PatientEntity();
    newPatient.userId = createProfileDto.userId;
    return this.save(newPatient);
  }

  async findById(id: number): Promise<PatientEntity> {
    return this.findOne({ id });
  }

  async findPatientByUser(userId: number): Promise<PatientEntity> {
    return this.findOne({ userId });
  }

  // async findPatientIdByUserId(userId: number): Promise<PatientEntity> {
  //   return this.createQueryBuilder('p')
  //     .leftJoinAndSelect('p.user', 'u')
  //     .where('u.id :id', { id: userId })
  //     .select('p.id')
  //     .getOne();
  // }
}
