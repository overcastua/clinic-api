import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateResolutionDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Test resolution',
    description: "Resolution's text",
  })
  readonly text: string;
}
