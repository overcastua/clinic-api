import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ConfigurationModule } from '../app-configuration/configuration.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ConfigurationModule, ProfileModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
