import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';

@Module({
  imports: [HttpModule],
  providers: [ClinicService],
  exports: [ClinicService],
})
export class ClinicModule {}
