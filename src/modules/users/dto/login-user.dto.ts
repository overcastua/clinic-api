import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export enum Role {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

export class LoginDto {
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

  @IsEnum(Role)
  @ApiProperty({ enum: Role })
  role: Role;
}
