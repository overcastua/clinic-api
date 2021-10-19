import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateResolutionDto {
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  expiresIn: number; // minutes
}
