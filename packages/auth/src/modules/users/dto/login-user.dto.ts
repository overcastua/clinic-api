import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@repos/common';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
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

  @IsEnum(Role)
  @ApiProperty({ enum: Role })
  readonly role: Role;
}
