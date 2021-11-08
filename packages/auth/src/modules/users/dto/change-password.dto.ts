import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(4, {
    message: 'The password is too short',
  })
  readonly current: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(4, {
    message: 'The password is too short',
  })
  readonly new: string;
}
