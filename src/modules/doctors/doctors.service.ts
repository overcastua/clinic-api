import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from './doctors.entity';
import { DoctorsRepository } from './doctors.repository';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorsRepository)
    private readonly repository: DoctorsRepository,
  ) {}

  async getDoctorsQueueIdByDoctorId(doctorId: number): Promise<number> {
    const doctor: DoctorEntity = await this.repository.getDoctorById(doctorId);
    const queueId = doctor?.queue.id;

    if (!queueId) {
      throw new NotFoundException('QueueId was not found');
    }

    return queueId;
  }
}
