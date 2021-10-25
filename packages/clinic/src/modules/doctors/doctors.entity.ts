import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { QueueEntity } from '../queue/queue.entity';
import { ResolutionsEntity } from '../resolutions/resolutions.entity';
import { SpecializationEntity } from '../specializations/specializations.entity';

@Entity('doctor', { schema: 'doctors' })
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: number;

  @ManyToOne(() => SpecializationEntity, (p) => p.doctors)
  specialization: SpecializationEntity;

  @OneToOne(() => QueueEntity)
  @JoinColumn()
  queue: QueueEntity;

  @OneToMany(() => ResolutionsEntity, (resolution) => resolution.doctor)
  resolutions: ResolutionsEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;
}
