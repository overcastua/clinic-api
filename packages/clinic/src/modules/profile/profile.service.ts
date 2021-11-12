import { Metadata } from '@grpc/grpc-js';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ClientGrpc } from '@nestjs/microservices';
import {
  configureGRPC,
  formMetadata,
  IProfileEntity,
  IProfileServiceForClinic,
} from '@repos/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProfileService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  @Client(configureGRPC(process.env.PROFILE_GRPC_URL, 'profile'))
  private readonly client: ClientGrpc;

  private profile: IProfileServiceForClinic;

  onModuleInit() {
    this.profile =
      this.client.getService<IProfileServiceForClinic>('ProfileGRPCService');
  }

  async getProfile(userId: number): Promise<IProfileEntity> {
    const meta: Metadata = formMetadata.call(this);

    const profile = await lastValueFrom(
      this.profile.getProfileByUserId({ userId }, meta),
    );

    return profile;
  }

  async getManyProfiles(users: number[]): Promise<IProfileEntity[]> {
    const meta: Metadata = formMetadata.call(this);

    const { profiles } = await lastValueFrom(
      this.profile.getProfileBatch({ users }, meta),
    );

    return profiles;
  }
}
