import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUid, JwtAuthGuard } from '@repos/common';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('account')
@Controller('account')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('password')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: "Change account's password" })
  @ApiCreatedResponse({
    description: 'Password was successfully changed',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined schema',
  })
  @ApiForbiddenResponse({
    description:
      'Wrong old password given or the new password equals the old one',
  })
  @ApiUnauthorizedResponse({
    description:
      'Either the authorization header is empty or the bearer token is malformed',
  })
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @GetUid() userId: number,
  ): Promise<void> {
    return this.userService.changePassword(dto, userId);
  }
}
