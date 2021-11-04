import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  time: string;
}
