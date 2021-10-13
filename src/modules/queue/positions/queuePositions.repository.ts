import { PatientEntity } from 'src/modules/patient/patient.entity';
import { Repository, EntityRepository } from 'typeorm';
import { QueueEntity } from '../queue.entity';
import { QueuePositionEntity } from './queuePositions.entity';

@EntityRepository(QueuePositionEntity)
export class QueuePositionRepository extends Repository<QueuePositionEntity> {
  async getFirst(queueId: number): Promise<QueuePositionEntity> {
    return this.createQueryBuilder('pos')
      .leftJoinAndSelect('pos.queue', 'q')
      .where('q.id = :id', { id: queueId })
      .orderBy('pos.created_at', 'ASC')
      .leftJoinAndSelect('pos.patient', 'p')
      .getOne();
  }

  async deleteFirst(queueId: number): Promise<void> {
    const first: QueuePositionEntity = await this.getFirst(queueId);

    await this.remove(first);
  }

  async add(
    queue: QueueEntity,
    patient: PatientEntity,
  ): Promise<QueuePositionEntity> {
    const entry = new QueuePositionEntity();
    entry.queue = queue;
    entry.patient = patient;
    return this.save(entry);
  }
}
