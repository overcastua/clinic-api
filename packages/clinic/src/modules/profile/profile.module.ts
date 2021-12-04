import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { configureGRPC, CustomConfigService } from '@repos/common';
import { ProfileService } from './profile.service';

@Module({
  providers: [
    ProfileService,
    {
      provide: 'PROFILE_PACKAGE',
      useFactory: (configService: CustomConfigService) => {
        return ClientProxyFactory.create(
          configureGRPC(configService.get<string>('GRPC.profile'), 'profile'),
        );
      },
      inject: [CustomConfigService],
    },
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
