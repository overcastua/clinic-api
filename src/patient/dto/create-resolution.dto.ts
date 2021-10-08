import { IsNotEmpty } from 'class-validator';

export class CreateResolutionDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  expires_in: number;
}
