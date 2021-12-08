import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateProfileDto,
  CustomConfigService,
  formMetadata,
  IProfileService,
} from '@repos/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProfileService implements OnModuleInit {
  constructor(
    private readonly configService: CustomConfigService,
    @Inject('PROFILE_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  private profile: IProfileService;

  onModuleInit() {
    this.profile =
      this.client.getService<IProfileService>('ProfileGRPCService');
  }

  async createProfile(profileDto: CreateProfileDto): Promise<void> {
    const meta: Metadata = formMetadata(
      this.configService.get<string>('jwt.secret'),
    );

    const response = await lastValueFrom(
      this.profile.createProfile(profileDto, meta),
    );
  }
}
