import { QueueEntity } from 'src/modules/queue/queue.entity';
import { ResolutionsEntity } from 'src/modules/resolutions/resolutions.entity';
import { UsersEntity } from 'src/modules/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;

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
