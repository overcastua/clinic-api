import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard, UpdateProfileDto } from '@repos/common';
import { ProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get own profile' })
  @ApiBearerAuth('JWT')
  @ApiOkResponse({
    description: 'Returns profile',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined schema',
  })
  async getOwnProfile(@Req() req) {
    return this.profileService.getProfileByUserId(req.user.userId);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Edit own profile' })
  @ApiBearerAuth('JWT')
  @ApiOkResponse({
    description: 'Profile was edited',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined schema',
  })
  @ApiNotFoundResponse({ description: 'Profile was not found' })
  async editOwnProfile(
    @Body() dto: UpdateProfileDto,
    @Req() req,
  ): Promise<ProfileEntity> {
    return this.profileService.editOwnProfile(dto, req.user.userId);
  }
}
