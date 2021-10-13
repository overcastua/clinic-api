import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class AddToQueueDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  queueId: number;
}
