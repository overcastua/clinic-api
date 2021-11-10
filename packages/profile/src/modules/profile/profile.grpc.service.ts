import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProfileDto, IEmpty } from '@repos/common';
import { ProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileGRPCService {
  constructor(private readonly profileService: ProfileService) {}
  @GrpcMethod()
  async getProfileByUserId(): Promise<ProfileEntity> {
    return this.profileService.getProfileByUserId(1);
  }

  @GrpcMethod()
  async createProfile(dto: CreateProfileDto): Promise<IEmpty> {
    await this.profileService.create(dto);
    return {};
  }

  @GrpcMethod()
  async getProfileBatch({
    users,
  }: {
    users: number[];
  }): Promise<ProfileEntity[]> {
    return this.profileService.getProfileBatch(users);
  }
}
