import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ConfigurationModule } from '../app-configuration/configuration.module';
import { jwtConstants, JwtStrategy } from '@repos/common';
import { JwtModule } from '@nestjs/jwt';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    ConfigurationModule,
    DoctorsModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
