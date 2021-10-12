import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from 'src/modules/patient/patient.entity';
import { PatientService } from 'src/modules/patient/patient.service';
import { AddToQueueDto } from './dto/add-to-queue.dto';
import { QueueEntity } from './queue.entity';
import { QueueRepository } from './queue.repository';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueRepository)
    private readonly queueRepository: QueueRepository,
    private readonly patientService: PatientService,
  ) {}

  async getIdOfFirst(): Promise<number> {
    const queue: QueueEntity = await this.queueRepository.getFirst();
    const firstId: number = queue?.patient.id;

    if (!firstId) throw new NotFoundException();

    return firstId;
  }

  async deleteCurrentAndGetNewFirst(): Promise<number> {
    await this.getIdOfFirst(); // if not empty, else the error will be thrown

    await this.queueRepository.deleteFirst();
    return this.getIdOfFirst();
  }

  async add(dto: AddToQueueDto): Promise<void> {
    const patient: PatientEntity = await this.patientService.findById(dto.id);
    await this.queueRepository.add(patient);
  }
}
