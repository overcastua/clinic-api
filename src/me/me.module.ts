import { Module } from '@nestjs/common';
import { ResolutionsModule } from 'src/resolutions/resolutions.module';
import { MeController } from './me.controller';
import { MeService } from './me.service';

@Module({
  imports: [ResolutionsModule],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
