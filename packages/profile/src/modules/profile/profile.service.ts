import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto, AWSClient, UpdateProfileDto } from '@repos/common';
import { ProfileEntity } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(dto: CreateProfileDto): Promise<void> {
    await this.profileRepository.add(dto);
  }

  async editOwnProfile(
    dto: UpdateProfileDto,
    userId: number,
  ): Promise<ProfileEntity> {
    if (dto.image) {
      const bucket = AWSClient.getS3Instance();

      const { id } = await this.getProfileByUserId(userId);
      const link = await bucket.putBase64AndGetURL(dto.image, id);

      await this.profileRepository.updateProfile(dto, userId, link);
    } else {
      await this.profileRepository.updateProfile(dto, userId);
    }

    return this.getProfileByUserId(userId);
  }

  async getProfileByUserId(userId: number): Promise<ProfileEntity> {
    return this.profileRepository.findProfile(userId);
  }

  async getProfileBatch(users: number[]): Promise<ProfileEntity[]> {
    return this.profileRepository.findBatchByUserIds(users);
  }
}
