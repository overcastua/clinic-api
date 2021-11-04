import { PatientEntity } from '../../patient/patient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { QueueEntity } from '../queue.entity';

@Entity('position', { schema: 'queues' })
export class QueuePositionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PatientEntity, (patient) => patient.positions)
  patient: PatientEntity;

  @ManyToOne(() => QueueEntity, (q) => q.id)
  queue: QueueEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;
}
