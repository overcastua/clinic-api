import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateResolutionDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly text: string;
}
