import { IsEnum, IsNotEmpty } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class CreatePatientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  birthDate: Date;
}
