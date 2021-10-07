import { EntityRepository, Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientEntity } from './patient.entity';

@EntityRepository(PatientEntity)
export class PatientRepository extends Repository<PatientEntity> {
  async add(createPatientDto: CreatePatientDto): Promise<void> {
    const newPatient = new PatientEntity();
    newPatient.birthDate = createPatientDto.birthDate;
    newPatient.gender = createPatientDto.gender;
    newPatient.name = createPatientDto.name;
    await this.save(newPatient);
  }

  async findByName(name: string): Promise<PatientEntity> {
    return this.findOne({ name });
  }
}
