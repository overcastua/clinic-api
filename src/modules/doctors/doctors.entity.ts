import { UsersEntity } from 'src/modules/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { QueueEntity } from '../queue/queue.entity';
import { ResolutionsEntity } from '../resolutions/resolutions.entity';
import { SpecializationEntity } from '../specializations/specializations.entity';

@Entity('doctor')
export class DoctorEntity {
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
  public created_at: Date;
}
