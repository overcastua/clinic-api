import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsRepository } from './doctors.repository';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorsRepository])],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
