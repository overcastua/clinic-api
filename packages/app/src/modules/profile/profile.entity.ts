import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { DoctorEntity } from '../doctors/doctors.entity';
import { PatientEntity } from '../patient/patient.entity';

@Entity('profile', { schema: 'profile' })
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  birthDate: Date;

  @OneToOne(() => PatientEntity, (patient) => patient.profile)
  patient: PatientEntity;

  @OneToOne(() => DoctorEntity, (doctor) => doctor.profile)
  doctor: DoctorEntity;
}
