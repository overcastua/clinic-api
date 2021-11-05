import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateResolutionDto {
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @IsNumberString()
  @ApiProperty()
  resolutionId: number;
}
