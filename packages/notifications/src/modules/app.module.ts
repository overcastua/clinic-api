import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ConfigurationModule } from '../app-configuration/configuration.module';
import { CustomConfigService, JwtStrategy } from '@repos/common';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsCQRSModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigurationModule,
    JwtModule.registerAsync({
      useFactory: (config: CustomConfigService) => {
        return {
          secret: config.get<string>('jwt.secret'),
        };
      },
      inject: [CustomConfigService],
    }),
    NotificationsCQRSModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
