import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, Matches, MinLength } from 'class-validator';
import { Gender } from '../constants';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'Dima',
    description: "Person's name",
  })
  @Matches(/^[a-zA-Z]+$/, { message: 'Name should contain only letters' })
  @MinLength(3)
  readonly name: string;

  @ApiProperty({
    enum: Gender,
    example: 'male',
    description: "Person's gender",
  })
  @IsEnum(Gender)
  readonly gender: Gender;

  @IsDateString()
  @ApiProperty({
    example: 'Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)',
    description: "Person's birth date",
  })
  readonly birthDate: Date;

  constructor(dto: any) {
    this.name = dto?.name;
    this.gender = dto?.gender;
    this.birthDate = dto?.birthDate;
  }
}
