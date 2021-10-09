import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  birthDate: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  @ApiProperty()
  gender: Gender;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(4, {
    message: 'The password is too short',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(4, {
    message: 'The password is too short',
  })
  confirmPassword: string;
}
