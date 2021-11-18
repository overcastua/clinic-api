import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { configureGRPC } from '@repos/common';
import { ClinicService } from './clinic.service';

@Module({
  providers: [
    ClinicService,
    {
      provide: 'CLINIC_PACKAGE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(
          configureGRPC(configService.get('GRPC.clinic'), 'clinic'),
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [ClinicService],
})
export class ClinicModule {}
