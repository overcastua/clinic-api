import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DoctorEntity } from '../doctors.entity';

@Entity('specialization', { schema: 'doctors' })
export class SpecializationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => DoctorEntity, (doctor) => doctor.specialization)
  doctors: DoctorEntity[];
}
