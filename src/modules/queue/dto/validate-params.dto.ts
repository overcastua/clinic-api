import { IsNumberString } from 'class-validator';

export class QueueValidateDto {
  @IsNumberString()
  queueId: number;
}
