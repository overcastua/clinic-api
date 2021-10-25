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

  async getAllDoctorsOfCertainSpecialization(
    specId: number,
  ): Promise<DoctorEntity[]> {
    const doctors: DoctorEntity[] =
      await this.repository.getAllBySpecializationId(specId);

    if (!doctors.length) {
      throw new NotFoundException(
        'There is no doctors with this specialization',
      );
    }

    return doctors;
  }

  async findDoctorByUser(userId: number): Promise<DoctorEntity> {
    const doctor: DoctorEntity = await this.repository.findDoctorByUser(userId);

    if (!doctor)
      throw new NotFoundException('Doctor with this email does not exist');

    return doctor;
  }
}
