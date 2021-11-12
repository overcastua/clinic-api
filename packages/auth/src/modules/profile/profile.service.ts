import { Metadata } from '@grpc/grpc-js';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ClientGrpc } from '@nestjs/microservices';
import {
  configureGRPC,
  CreateProfileDto,
  formMetadata,
  IProfileService,
} from '@repos/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProfileService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  @Client(configureGRPC(process.env.PROFILE_GRPC_URL, 'profile'))
  private readonly client: ClientGrpc;

  private profile: IProfileService;

  onModuleInit() {
    this.profile =
      this.client.getService<IProfileService>('ProfileGRPCService');
  }

  async createProfile(profileDto: CreateProfileDto): Promise<void> {
    const meta: Metadata = formMetadata.call(this);

    const response = await lastValueFrom(
      this.profile.createProfile(profileDto, meta),
    );
  }
}
