import { ResolutionsEntity } from 'src/modules/resolutions/resolutions.entity';
import { UsersEntity } from 'src/modules/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ProfileEntity } from '../profile/profile.entity';
import { QueuePositionEntity } from '../queue/positions/queuePositions.entity';

@Entity('patient', { schema: 'patients' })
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

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
