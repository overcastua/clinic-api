import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
} from 'typeorm';
import { DoctorEntity } from '../doctors/doctors.entity';
import { TimeSlotsEntity } from './slots/slots.entity';

@Entity('workday', { schema: 'appointments' })
export class WorkdaysEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.workdays)
  doctor: DoctorEntity;

  @Column()
  date: Date;

  @OneToMany(() => TimeSlotsEntity, (slot) => slot.workday)
  slots: TimeSlotsEntity[];
}
