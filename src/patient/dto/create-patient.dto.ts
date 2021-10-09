import { UsersEntity } from 'src/users/users.entity';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class CreatePatientDto {
  name: string;

  gender: Gender;

  birthDate: Date;

  user: UsersEntity;
}
