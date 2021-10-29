import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from '../../patient/patient.entity';
import { PatientService } from '../../patient/patient.service';
import { QueueEntity } from '../queue.entity';
import { QueuePositionEntity } from './queuePositions.entity';
import { QueuePositionRepository } from './queuePositions.repository';

@Injectable()
export class QueuePositionService {
  constructor(
    @InjectRepository(QueuePositionRepository)
    private readonly repository: QueuePositionRepository,
    private readonly patientService: PatientService,
  ) {}

  async getIdOfFirst(queueId: number): Promise<number> {
    const entry: QueuePositionEntity = await this.repository.getFirst(queueId);
    const firstId = entry?.patient.id;

    if (!firstId) throw new NotFoundException();

    return firstId;
  }

  async deleteCurrentAndGetNewFirst(queueId: number): Promise<number> {
    const deletedPatient = await this.repository.deleteFirst(queueId);

    if (!deletedPatient) {
      throw new NotFoundException();
    }

    return this.getIdOfFirst(queueId);
  }

  async add(queue: QueueEntity, userId: number): Promise<void> {
    const patient: PatientEntity =
      await this.patientService.findPatientByUserId(userId);
    await this.repository.add(queue, patient);
  }
}
