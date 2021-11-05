import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Module({
  imports: [HttpModule],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
