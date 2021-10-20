import { UsersEntity } from 'src/modules/users/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientEntity } from './patient.entity';

@EntityRepository(PatientEntity)
export class PatientRepository extends Repository<PatientEntity> {
  async add(createPatientDto: CreatePatientDto): Promise<PatientEntity> {
    const newPatient = new PatientEntity();
    newPatient.user = createPatientDto.user;
    return this.save(newPatient);
  }

  async findById(id: number): Promise<PatientEntity> {
    return this.findOne({ id });
  }

  async findPatientByUser(user: UsersEntity): Promise<PatientEntity> {
    return this.findOne({ user });
  }

  // async findPatientIdByUserId(userId: number): Promise<PatientEntity> {
  //   return this.createQueryBuilder('p')
  //     .leftJoinAndSelect('p.user', 'u')
  //     .where('u.id :id', { id: userId })
  //     .select('p.id')
  //     .getOne();
  // }
}
