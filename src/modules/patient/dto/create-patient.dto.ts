import { UsersEntity } from 'src/modules/users/users.entity';
import { PatientEntity } from '../patient.entity';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class CreatePatientDto {
  name: string;

  gender: Gender;

  birthDate: Date;

  user: UsersEntity;

  patient?: PatientEntity;
}
