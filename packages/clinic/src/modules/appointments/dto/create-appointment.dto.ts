import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsDateString()
  readonly date: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly time: string;
}
