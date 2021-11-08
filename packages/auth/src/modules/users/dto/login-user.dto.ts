import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@repos/common';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
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

  @IsEnum(Role)
  @ApiProperty({
    enum: Role,
    example: 'patient',
    description: 'Role of the user',
  })
  readonly role: Role;
}
