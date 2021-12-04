import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { configureGRPC, CustomConfigService } from '@repos/common';
import { ClinicService } from './clinic.service';

@Module({
  providers: [
    ClinicService,
    {
      provide: 'CLINIC_PACKAGE',
      useFactory: (configService: CustomConfigService) => {
        return ClientProxyFactory.create(
          configureGRPC(configService.get<string>('GRPC.clinic'), 'clinic'),
        );
      },
      inject: [CustomConfigService],
    },
  ],
  exports: [ClinicService],
})
export class ClinicModule {}
