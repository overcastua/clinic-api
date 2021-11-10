import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { configureGRPC, IProfileEntity, IProfileService } from '@repos/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProfileService implements OnModuleInit {
  @Client(configureGRPC(process.env.PROFILE_GRPC_URL, 'profile'))
  private readonly client: ClientGrpc;

  private profile: IProfileService;

  onModuleInit() {
    this.profile =
      this.client.getService<IProfileService>('ProfileGRPCService');
  }

  async getProfile(userId: number): Promise<IProfileEntity> {
    try {
      const res = await lastValueFrom(
        this.profile.getProfileByUserId({ userId }),
      );
      console.log(res);

      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async getManyProfiles(users: number[]): Promise<IProfileEntity[]> {
    const res = await lastValueFrom(this.profile.getProfileBatch({ users }));
    console.log(res);

    return res;
  }
}
