import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecializationsRepository } from './specializations.repository';
import { SpecializationsService } from './specializations.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecializationsRepository])],
  providers: [SpecializationsService],
  exports: [SpecializationsService],
})
export class SpecializationsModule {}
