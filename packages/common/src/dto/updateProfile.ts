import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Gender } from '../constants';

export class UpdateProfileDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  readonly gender: Gender;

  @ApiProperty()
  readonly birthDate: Date;

  constructor(dto: any) {
    this.name = dto?.name;
    this.gender = dto?.gender;
    this.birthDate = dto?.birthDate;
  }
}
