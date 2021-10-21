import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto, Role } from 'src/modules/users/dto/login-user.dto';
import { RegisterDto } from 'src/modules/users/dto/register-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';
import { IAccessToken } from './interfaces/access-token.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('registration')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'User was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined DTO schema',
  })
  @ApiConflictResponse({
    description: 'The email is already in use',
  })
  async create(@Body() dto: RegisterDto): Promise<void> {
    return this.userService.register(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Log in as a patient' })
  @ApiCreatedResponse({
    description:
      'Logined successfully, returns acces_token with encoded userId and patientId',
    type: 'json',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined DTO schema',
  })
  @ApiUnauthorizedResponse({
    description:
      'User with this email does not exist or the password is incorrect',
  })
  async login(@Body() dto: LoginDto, @Req() req): Promise<IAccessToken> {
    return this.authService.login(req.user.email, <Role>dto.role);
  }
}
