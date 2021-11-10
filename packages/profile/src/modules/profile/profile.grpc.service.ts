import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProfileDto, IEmpty } from '@repos/common';
import { ProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileGRPCService {
  constructor(private readonly profileService: ProfileService) {}
  @GrpcMethod()
  async createProfile(dto: CreateProfileDto): Promise<IEmpty> {
    await this.profileService.create(dto);
    return {};
  }

  @GrpcMethod()
  async getProfileByUserId({
    userId,
  }: {
    userId: number;
  }): Promise<ProfileEntity> {
    return this.profileService.getProfileByUserId(userId);
  }

  @GrpcMethod()
  async getProfileBatch({
    users,
  }: {
    users: number[];
  }): Promise<{ profiles: ProfileEntity[] }> {
    const profiles = await this.profileService.getProfileBatch(users);
    return { profiles };
  }
}
