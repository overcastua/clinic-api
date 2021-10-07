export class CreatePatientDto {
  name: string;
  gender: Gender;
  birthDate: Date;
}

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
