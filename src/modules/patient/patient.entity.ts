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
import { QueuePositionEntity } from '../queue/positions/queuePositions.entity';

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

  @OneToMany(() => QueuePositionEntity, (queue) => queue.patient)
  positions: QueuePositionEntity[];

  @OneToMany(() => ResolutionsEntity, (resolution) => resolution.patient)
  resolutions: ResolutionsEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;
}
