import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from '@repos/common';
import { ProfileEntity } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<void> {
    await this.profileRepository.add(createProfileDto);
  }

  async getProfileByUserId(userId: number): Promise<ProfileEntity> {
    return this.profileRepository.findProfile(userId);
  }
}