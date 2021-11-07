import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateProfileDto,
  JwtAuthGuard,
  ParseArrayOfNumbersPipe,
  UpdateProfileDto,
} from '@repos/common';
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
  @ApiOperation({ summary: 'Get profile by userId' })
  @ApiOkResponse({
    description: 'Returns profile',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined schema',
  })
  async getProfileByUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProfileEntity> {
    return this.profileService.getProfileByUserId(id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get own profile' })
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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

  @Get()
  @ApiOperation({ summary: 'Get many profiles by userIds' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns profiles array',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined schema',
  })
  async getProfileBatch(
    @Query('users', ParseArrayOfNumbersPipe) users: number[],
  ) {
    return this.profileService.getProfileBatch(users);
  }
}
