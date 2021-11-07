import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateResolutionDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly text: string;

  @IsNumberString()
  @ApiProperty()
  readonly resolutionId: number;
}
