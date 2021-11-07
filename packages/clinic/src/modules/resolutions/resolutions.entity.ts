import { PatientEntity } from '../patient/patient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { DoctorEntity } from '../doctors/doctors.entity';
import { CreateResolutionDto } from './dto/create-resolution.dto';

@Entity('resolution', { schema: 'doctors' })
export class ResolutionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  expiresIn: Date;

  @ManyToOne(() => PatientEntity, (p) => p.resolutions)
  patient: PatientEntity;

  @Column()
  patientId: number;

  @ManyToOne(() => DoctorEntity, (d) => d.resolutions)
  doctor: DoctorEntity;

  @Column()
  doctorId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  constructor(dto?: CreateResolutionDto, ttl?: Date, doctor?: DoctorEntity) {
    if (dto) {
      this.patientId = dto.patientId;
      this.text = dto.text;
      this.expiresIn = ttl;
      this.doctor = doctor;
    }
  }
}
