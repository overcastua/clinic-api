import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@repos/common';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Dima',
    description: "Person's name",
  })
  @Matches(/^[a-zA-Z]+$/, { message: 'Name should contain only letters' })
  @MinLength(3)
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)',
    description: "Person's birth date",
  })
  readonly birthDate: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  @ApiProperty({
    enum: Gender,
    example: 'male',
    description: "Person's gender",
  })
  readonly gender: Gender;

  @IsNotEmpty()
  @ApiProperty({
    example: 'test@test.com',
    description: 'Email address',
  })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '1234',
  })
  @MinLength(4, {
    message: 'The password is too short',
  })
  readonly password: string;
  constructor(readonly dto?) {
    if (dto) {
      this.password = dto.password;
      this.name = dto.name;
      this.email = dto.email;
      this.gender = dto.gender;
      this.birthDate = dto.birthDate;
    }
  }
}
