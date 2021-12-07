import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto, AWSClient, UpdateProfileDto } from '@repos/common';
import { ProfileEntity } from './profile.entity';
import { ProfileRepository } from './profile.repository';
import * as fs from 'fs';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(dto: CreateProfileDto): Promise<void> {
    await this.profileRepository.add(dto);
  }

  async editOwnProfilePicture(
    image: Express.Multer.File,
    userId: number,
  ): Promise<void> {
    const bucket = AWSClient.getS3Instance();

    const { id } = await this.getProfileByUserId(userId);
    const link = await bucket.putBase64AndGetURL(image, id);

    await this.profileRepository.updateProfilePic(link, userId);

    fs.rmSync('./upload', { force: true, recursive: true });
  }

  async editOwnProfile(
    dto: UpdateProfileDto,
    userId: number,
  ): Promise<ProfileEntity> {
    await this.profileRepository.updateProfile(dto, userId);

    return this.getProfileByUserId(userId);
  }

  async getProfileByUserId(userId: number): Promise<ProfileEntity> {
    return this.profileRepository.findProfile(userId);
  }

  async getProfileBatch(users: number[]): Promise<ProfileEntity[]> {
    return this.profileRepository.findBatchByUserIds(users);
  }
}
