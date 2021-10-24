enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class CreateProfileDto {
  name: string;

  gender: Gender;

  birthDate: Date;

  userId: number;
}
