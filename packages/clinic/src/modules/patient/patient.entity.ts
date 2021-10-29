import { ResolutionsEntity } from '../resolutions/resolutions.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { QueuePositionEntity } from '../queue/positions/queuePositions.entity';

@Entity('patient', { schema: 'patients' })
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: number;

  @OneToMany(() => QueuePositionEntity, (queue) => queue.patient)
  positions: QueuePositionEntity[];

  @OneToMany(() => ResolutionsEntity, (resolution) => resolution.patient)
  resolutions: ResolutionsEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  constructor(userId: number) {
    this.userId = userId;
  }
}
