import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class CreatePatientDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  @ApiProperty()
  gender: Gender;

  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
  birthDate: Date;
}
