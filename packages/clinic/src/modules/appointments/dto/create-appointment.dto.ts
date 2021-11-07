import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  readonly date: Date;

  @IsNotEmpty()
  readonly time: string;
}
