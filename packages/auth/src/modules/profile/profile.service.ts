import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import {
  configureGRPC,
  CreateProfileDto,
  IProfileService,
} from '@repos/common';
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

  async createProfile(profileDto: CreateProfileDto): Promise<void> {
    const response = await lastValueFrom(
      this.profile.createProfile(profileDto),
    );
    return;
  }
}
