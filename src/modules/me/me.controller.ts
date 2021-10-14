import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt.auth.guard';
import { ResolutionsEntity } from 'src/modules/resolutions/resolutions.entity';
import { Role } from '../users/dto/login-user.dto';
import { Roles } from '../users/users.roles.decorator';
import { RolesGuard } from '../users/users.roles.guard';
import { MeService } from './me.service';

@ApiTags('me')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('resolutions')
  @Roles(Role.PATIENT)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get own resolutions' })
  @ApiOkResponse({
    description:
      'Patient was successfully authenticated, returns a resolutions list',
    type: [ResolutionsEntity],
  })
  @ApiNotFoundResponse({
    description:
      'Patient was successfully authenticated but no resolutions were found',
  })
  @ApiUnauthorizedResponse({
    description: 'Patient can not be authenticated',
  })
  async getResolutions(@Req() req): Promise<ResolutionsEntity[]> {
    return this.meService.getOwnResolutions(req.user.patientId);
  }
}
