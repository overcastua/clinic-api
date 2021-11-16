import { Metadata } from '@grpc/grpc-js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto, UpdateProfileDto } from '@repos/common';
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
    const res = await this.profileRepository.updateProfile(dto, userId);

    if (res.affected === 0) {
      throw new NotFoundException('Profile was not found');
    }

    return this.getProfileByUserId(userId);
  }

  async getProfileByUserId(userId: number): Promise<ProfileEntity> {
    Metadata;
    return this.profileRepository.findProfile(userId);
  }

  async getProfileBatch(users: number[]): Promise<ProfileEntity[]> {
    return this.profileRepository.findBatchByUserIds(users);
  }
}
