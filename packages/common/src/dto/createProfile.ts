import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Matches, MinLength } from 'class-validator';
import { Gender } from '../constants';

export class CreateProfileDto {
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

  @ApiProperty({
    example: 'Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)',
    description: "Person's birth date",
  })
  readonly birthDate: Date;

  @ApiProperty({
    example: 1,
    description: 'The id of credentials record corresponding to this profile',
  })
  readonly userId: number;

  constructor(dto: any, userId: number) {
    this.name = dto?.name;
    this.gender = dto?.gender;
    this.birthDate = dto?.birthDate;
    this.userId = userId;
  }
}
