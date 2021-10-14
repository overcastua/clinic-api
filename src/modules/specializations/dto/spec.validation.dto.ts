import { IsNumberString } from 'class-validator';

export class SpecValidateDto {
  @IsNumberString()
  specializationId: number;
}
