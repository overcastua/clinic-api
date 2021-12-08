import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomConfigService, JwtStrategy } from '@repos/common';
import { Connection } from 'typeorm';
import { ConfigurationModule } from '../app-configuration/configuration.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { ProfileModule } from './profile/profile.module';

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
    ProfileModule,
    MaintenanceModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
