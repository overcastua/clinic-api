import { PatientEntity } from '../../patient/patient.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { WorkdaysEntity } from '../workdays.entity';

@Entity('slot', { schema: 'appointments' })
export class TimeSlotsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PatientEntity, (patient) => patient.positions)
  patient: PatientEntity;

  @ManyToOne(() => WorkdaysEntity, (a) => a.slots)
  workday: WorkdaysEntity;

  @Column()
  time: string;

  @Column({ default: true })
  isFree: boolean;

  @Column({ default: false })
  isFinished: boolean;
}
