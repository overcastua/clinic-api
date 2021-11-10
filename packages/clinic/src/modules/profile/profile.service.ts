import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import {
  configureGRPC,
  IProfileEntity,
  IProfileServiceForClinic,
} from '@repos/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProfileService implements OnModuleInit {
  @Client(configureGRPC(process.env.PROFILE_GRPC_URL, 'profile'))
  private readonly client: ClientGrpc;

  private profile: IProfileServiceForClinic;

  onModuleInit() {
    this.profile =
      this.client.getService<IProfileServiceForClinic>('ProfileGRPCService');
  }

  async getProfile(userId: number): Promise<IProfileEntity> {
    const res = await lastValueFrom(
      this.profile.getProfileByUserId({ userId }),
    );

    return res;
  }

  async getManyProfiles(users: number[]): Promise<IProfileEntity[]> {
    const res = await lastValueFrom(this.profile.getProfileBatch({ users }));

    return res.profiles;
  }
}
