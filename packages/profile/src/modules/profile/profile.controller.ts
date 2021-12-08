import {
  Body,
  Controller,
  Get,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUid, JwtAuthGuard, UpdateProfileDto } from '@repos/common';
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
  async getOwnProfile(@GetUid() userId: number): Promise<ProfileEntity> {
    return this.profileService.getProfileByUserId(userId);
  }

  @Put('me/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Update profile picture' })
  @ApiBearerAuth('JWT')
  @ApiOkResponse({
    description: 'Profile picture was updated',
  })
  async updateProfilePicture(
    @GetUid() userId: number,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    return this.profileService.editOwnProfilePicture(image, userId);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Edit own profile' })
  @ApiBearerAuth('JWT')
  @ApiCreatedResponse({
    description: 'Profile was edited',
  })
  @ApiBadRequestResponse({
    description: 'Received data violates the predefined schema',
  })
  @ApiNotFoundResponse({ description: 'Profile was not found' })
  async editOwnProfile(
    @GetUid() userId: number,
    @Body() dto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    return this.profileService.editOwnProfile(dto, userId);
  }
}
