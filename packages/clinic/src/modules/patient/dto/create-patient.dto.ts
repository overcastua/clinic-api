import { PatientEntity } from '../patient.entity';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class CreateProfileDto {
  name: string;

  gender: Gender;

  birthDate: Date;

  user: any;

  patient?: PatientEntity;
}
