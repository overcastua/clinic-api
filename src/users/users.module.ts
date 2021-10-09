import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PatientModule } from 'src/patient/patient.module';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), PatientModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
