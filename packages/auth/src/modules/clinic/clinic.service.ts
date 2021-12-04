import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CustomConfigService,
  formMetadata,
  IClinicService,
} from '@repos/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClinicService implements OnModuleInit {
  constructor(
    private readonly configService: CustomConfigService,
    @Inject('CLINIC_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  private clinic: IClinicService;

  onModuleInit() {
    this.clinic = this.client.getService<IClinicService>('ClinicGRPCService');
  }

  async createPatient(userId: number): Promise<void> {
    const meta: Metadata = formMetadata(
      this.configService.get<string>('jwt.secret'),
    );

    const response = await lastValueFrom(
      this.clinic.createPatient({ userId }, meta),
    );
  }
}
