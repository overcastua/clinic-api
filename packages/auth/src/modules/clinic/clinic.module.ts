import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';

@Module({
  providers: [ClinicService],
  exports: [ClinicService],
})
export class ClinicModule {}
