import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(3)
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly birthDate: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  @ApiProperty({ enum: Gender })
  readonly gender: Gender;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(4, {
    message: 'The password is too short',
  })
  readonly password: string;
}
