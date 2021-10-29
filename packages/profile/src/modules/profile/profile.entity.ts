import { CreateProfileDto } from '@repos/common';
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

  constructor(dto?: CreateProfileDto) {
    if (dto) {
      this.name = dto.name;
      this.gender = dto.gender;
      this.birthDate = dto.birthDate;
      this.userId = dto.userId;
    }
  }
}
