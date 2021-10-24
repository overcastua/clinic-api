import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ unique: true })
  userId: number;
}
