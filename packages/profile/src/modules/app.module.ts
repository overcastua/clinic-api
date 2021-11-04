import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants, JwtStrategy } from '@repos/common';
import { Connection } from 'typeorm';
import { ConfigurationModule } from '../app-configuration/configuration.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    ConfigurationModule,
    ProfileModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
