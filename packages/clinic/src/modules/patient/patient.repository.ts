import { EntityRepository, Repository } from 'typeorm';
import { PatientEntity } from './patient.entity';

@EntityRepository(PatientEntity)
export class PatientRepository extends Repository<PatientEntity> {
  async add(userId: number): Promise<PatientEntity> {
    const newPatient = new PatientEntity(userId);

    return this.save(newPatient);
  }

  async findPatientByUserId(userId: number): Promise<PatientEntity> {
    return this.findOne({ userId });
  }
}
