import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsService } from './resolutions.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResolutionsRepository])],
  providers: [ResolutionsService],
  exports: [ResolutionsService],
})
export class ResolutionsModule {}
