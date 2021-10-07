import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientService } from 'src/patient/patient.service';
import { QueueRepository } from './queue.repository';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueRepository)
    private readonly queueRepository: QueueRepository,
    private readonly patientService: PatientService,
  ) {}

  async getIdOfFirst(): Promise<number> {
    const queue = await this.queueRepository.getFirst();
    return queue?.patient?.id;
  }

  async deleteCurrentAndGetNewFirst(): Promise<number> {
    await this.queueRepository.deleteFirst();
    return this.getIdOfFirst();
  }

  async add(name: string): Promise<void> {
    const patient = await this.patientService.findByName(name);
    await this.queueRepository.add(patient);
  }
}
