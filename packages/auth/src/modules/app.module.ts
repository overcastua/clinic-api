import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { ConfigurationModule } from '../app-configuration/configuration.module';
import { AuthModule } from './auth/auth.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
@Module({
  imports: [ConfigurationModule, UsersModule, AuthModule, MaintenanceModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
