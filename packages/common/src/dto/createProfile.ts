import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Gender } from '../constants';

export class CreateProfileDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  readonly gender: Gender;

  @ApiProperty()
  readonly birthDate: Date;

  @ApiProperty()
  readonly userId: number;

  constructor(dto: any, userId: number) {
    this.name = dto?.name;
    this.gender = dto?.gender;
    this.birthDate = dto?.birthDate;
    this.userId = userId;
  }
}
