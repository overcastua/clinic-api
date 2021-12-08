import { ResolutionsEntity } from '../resolutions/resolutions.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { TimeSlotsEntity } from '../appointments/slots/slots.entity';

@Entity('patient', { schema: 'patients' })
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: number;

  @OneToMany(() => TimeSlotsEntity, (wd) => wd.patient)
  positions: TimeSlotsEntity[];

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
