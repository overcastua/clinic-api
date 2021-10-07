import { QueueEntity } from 'src/queue/queue.entity';
import { ResolutionsEntity } from 'src/resolutions/resolutions.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('patient')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  birthDate: Date;

  @OneToMany(() => QueueEntity, (queue) => queue.patient)
  queues: QueueEntity[];

  @OneToMany(() => ResolutionsEntity, (resolution) => resolution.patient)
  resolutions: ResolutionsEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
