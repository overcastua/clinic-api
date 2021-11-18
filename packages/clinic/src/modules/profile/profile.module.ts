import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { configureGRPC } from '@repos/common';
import { ProfileService } from './profile.service';

@Module({
  providers: [
    ProfileService,
    {
      provide: 'PROFILE_PACKAGE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(
          configureGRPC(configService.get('GRPC.profile'), 'profile'),
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
