import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateResolutionDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly text: string;

  @IsNumberString()
  @ApiProperty()
  readonly patientId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  readonly expiresIn: number; // minutes
}
