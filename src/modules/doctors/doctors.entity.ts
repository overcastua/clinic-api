import { UsersEntity } from 'src/modules/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProfileEntity } from '../profile/profile.entity';
import { QueueEntity } from '../queue/queue.entity';
import { ResolutionsEntity } from '../resolutions/resolutions.entity';
import { SpecializationEntity } from '../specializations/specializations.entity';

@Entity('doctor', { schema: 'doctors' })
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

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
