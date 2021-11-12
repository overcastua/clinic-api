import { Metadata } from '@grpc/grpc-js';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { configureGRPC, formMetadata, IClinicService } from '@repos/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClinicService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  @Client(configureGRPC(process.env.CLINIC_GRPC_URL, 'clinic'))
  private readonly client: ClientGrpc;

  private clinic: IClinicService;

  onModuleInit() {
    this.clinic = this.client.getService<IClinicService>('ClinicGRPCService');
  }

  async createPatient(userId: number): Promise<void> {
    const meta: Metadata = formMetadata.call(this);

    const response = await lastValueFrom(
      this.clinic.createPatient({ userId }, meta),
    );
  }
}
