import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateResolutionDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Test resolution',
    description: "Resolution's text",
  })
  readonly text: string;

  @IsNumberString()
  @ApiProperty({
    example: 1,
    description: "Patient's id",
  })
  readonly patientId: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 5,
    description:
      "The resolution won't be available after this amount of minutes",
  })
  @IsNumberString()
  readonly expiresIn: number;
}
