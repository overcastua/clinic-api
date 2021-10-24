import { Repository, EntityRepository } from 'typeorm';
import { DoctorEntity } from '../doctors/doctors.entity';
import { QueueEntity } from './queue.entity';

@EntityRepository(QueueEntity)
export class QueueRepository extends Repository<QueueEntity> {
  async add(doctor: DoctorEntity): Promise<QueueEntity> {
    const newQueue = new QueueEntity();
    newQueue.doctor = doctor;
    return this.save(newQueue);
  }

  async findById(id: number): Promise<QueueEntity> {
    return this.findOne({ id });
  }
}
