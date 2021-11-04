import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { WorkdaysEntity } from '../appointments/workdays.entity';
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

  @OneToMany(() => WorkdaysEntity, (wd) => wd.doctor)
  workdays: WorkdaysEntity[];

  @OneToMany(() => ResolutionsEntity, (resolution) => resolution.doctor)
  resolutions: ResolutionsEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;
}
