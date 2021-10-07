import { PatientEntity } from '../patient.entity';

export class ReceivedResDto {
  text: string;
  expires_on: Date;
}

export class ResDto extends ReceivedResDto {
  name: string;
}

export class ModifiedCreateResolutionDto extends ReceivedResDto {
  patient: PatientEntity;
}
