import { PatientEntity } from 'src/patient/patient.entity';
import { Repository, EntityRepository } from 'typeorm';
import { QueueEntity } from './queue.entity';

@EntityRepository(QueueEntity)
export class QueueRepository extends Repository<QueueEntity> {
  async getFirst(): Promise<QueueEntity> {
    return this.createQueryBuilder('q')
      .orderBy('q.created_at', 'ASC')
      .leftJoinAndSelect('q.patient', 'p')
      .getOne();
  }

  async deleteFirst(): Promise<void> {
    const patient = await this.createQueryBuilder('q')
      .orderBy('q.created_at', 'ASC')
      .leftJoinAndSelect('q.patient', 'p')
      .getOne();

    await this.remove(patient);
  }

  async add(patient: PatientEntity): Promise<QueueEntity> {
    const newQueue = new QueueEntity();
    newQueue.patient = patient;
    return this.save(newQueue);
  }
}
