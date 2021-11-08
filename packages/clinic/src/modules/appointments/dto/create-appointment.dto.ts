import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    example: '2021-10-11',
    description: 'The date of the appointment',
  })
  @IsDateString()
  readonly date: Date;

  @ApiProperty({
    example: '12:00',
    description: 'The beginning time of the appointment',
  })
  @IsNotEmpty()
  readonly time: string;
}
