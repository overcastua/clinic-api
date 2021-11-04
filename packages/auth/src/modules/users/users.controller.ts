import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@repos/common';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('account')
@Controller('account')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('password')
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @Req() req,
  ): Promise<void> {
    return this.userService.changePassword(dto, req.user.userId);
  }
}
