import { Injectable } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { configureGRPC, IClinicService } from '@repos/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClinicService {
  @Client(configureGRPC(process.env.CLINIC_GRPC_URL, 'clinic'))
  private readonly client: ClientGrpc;

  private clinic: IClinicService;

  onModuleInit() {
    this.clinic = this.client.getService<IClinicService>('ClinicGRPCService');
  }

  async createPatient(userId: number): Promise<void> {
    console.log({ userId });
    const response = await lastValueFrom(this.clinic.createPatient({ userId }));
    return;
  }
}
