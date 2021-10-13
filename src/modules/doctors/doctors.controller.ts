import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';

@ApiTags('doctor')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  async get(): Promise<number> {
    return this.doctorsService.getDoctorsQueueIdByDoctorId(1);
  }
}
