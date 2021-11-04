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

  async getDoctorsQueueIdByDoctorId(userId: number): Promise<number> {
    const doctor: DoctorEntity = await this.repository.getDoctorByUserId(
      userId,
    );
    const queueId = doctor?.queue?.id;

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

  async findDoctorByUserId(userId: number): Promise<DoctorEntity> {
    const doctor: DoctorEntity = await this.repository.findDoctorByUserId(
      userId,
    );

    if (!doctor)
      throw new NotFoundException('Doctor with this userId does not exist');

    return doctor;
  }
}
