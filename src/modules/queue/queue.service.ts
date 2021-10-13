import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from 'src/modules/patient/patient.entity';
import { PatientService } from 'src/modules/patient/patient.service';
import { DoctorEntity } from '../doctors/doctors.entity';
import { AddToQueueDto } from './dto/add-to-queue.dto';
import { QueuePositionService } from './positions/queuePositions.service';
import { QueueEntity } from './queue.entity';
import { QueueRepository } from './queue.repository';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueRepository)
    private readonly queueRepository: QueueRepository,
    private readonly positionService: QueuePositionService,
    private readonly patientService: PatientService,
  ) {}

  async getIdOfFirst(queueId: number): Promise<number> {
    return this.positionService.getIdOfFirst(queueId);
  }

  async deleteCurrentAndGetNewFirst(queueId: number): Promise<number> {
    return this.positionService.deleteCurrentAndGetNewFirst(queueId);
  }

  async add(dto: AddToQueueDto): Promise<void> {
    const queue = await this.queueRepository.findById(dto.queueId);
    await this.positionService.add(queue, dto);
  }

  async create(doctor: DoctorEntity): Promise<QueueEntity> {
    return this.queueRepository.add(doctor);
  }
}
