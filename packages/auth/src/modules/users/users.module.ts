import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicModule } from '../clinic/clinic.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    ClinicModule,
    ProfileModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
