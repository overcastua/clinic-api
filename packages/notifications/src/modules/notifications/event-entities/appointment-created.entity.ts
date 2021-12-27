import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('appointmentCreated', { schema: 'notifications' })
export class AppointmentCreatedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  doctorUserId: number;

  @Column()
  date: Date;
}
