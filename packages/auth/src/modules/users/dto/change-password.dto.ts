import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '1234',
    description: 'Current password',
  })
  @MinLength(4, {
    message: 'The password is too short',
  })
  readonly current: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '4321',
    description: 'New password',
  })
  @MinLength(4, {
    message: 'The password is too short',
  })
  readonly new: string;
}
