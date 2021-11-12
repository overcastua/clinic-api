/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata, status } from '@grpc/grpc-js';
import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CreateProfileDto, GrpcGuard, IProfilesArray } from '@repos/common';
import { ProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(GrpcGuard)
export class ProfileGRPCService {
  constructor(private readonly profileService: ProfileService) {}
  @GrpcMethod()
  async createProfile(dto: CreateProfileDto): Promise<void> {
    return this.profileService.create(dto);
  }

  @GrpcMethod()
  async getProfileByUserId(
    {
      userId,
    }: {
      userId: number;
    },
    metadata: Metadata,
  ): Promise<ProfileEntity> {
    try {
      return this.profileService.getProfileByUserId(userId);
    } catch (err) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Profile was not found',
      });
    }
  }

  @GrpcMethod()
  async getProfileBatch(
    {
      users,
    }: {
      users: number[];
    },
    metadata: Metadata,
  ): Promise<IProfilesArray> {
    const profiles = await this.profileService.getProfileBatch(users);
    return { profiles };
  }
}
