import { PatientEntity } from 'src/modules/patient/patient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { DoctorEntity } from '../doctors/doctors.entity';

@Entity('resolution')
export class ResolutionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  expires_in: Date;

  @ManyToOne(() => PatientEntity, (p) => p.resolutions)
  patient: PatientEntity;

  @ManyToOne(() => DoctorEntity, (d) => d.resolutions)
  doctor: DoctorEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
