import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { DoctorEntity } from '../doctors/doctors.entity';
import { QueuePositionEntity } from './positions/queuePositions.entity';

@Entity('queue')
export class QueueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => DoctorEntity, (doctor) => doctor.queue)
  doctor: DoctorEntity;

  @OneToMany(() => QueuePositionEntity, (pos) => pos.queue)
  positions: QueuePositionEntity[];
}
