import { IsNumberString } from 'class-validator';

export class DoctorIdDto {
  @IsNumberString()
  doctorId: string;
}
