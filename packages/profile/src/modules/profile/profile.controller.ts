import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProfileDto } from '@repos/common';
import { ProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new profile' })
  @ApiCreatedResponse({
    description: 'Profile was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined DTO schema',
  })
  async create(@Body() dto: CreateProfileDto): Promise<void> {
    return this.profileService.create(dto);
  }

  @Get('user/:id')
  async getProfileByUserId(@Param('id') id: string): Promise<ProfileEntity> {
    return this.profileService.getProfileByUserId(parseInt(id));
  }

  @Get()
  async getProfileBatch(@Query('users') users: string) {
    return this.profileService.getProfileBatch(JSON.parse(users));
  }
}
