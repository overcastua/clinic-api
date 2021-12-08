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

  @Column({
    default:
      'https://e7.pngegg.com/pngimages/274/947/png-clipart-computer-icons-user-business-believer-business-service-people.png',
  })
  image: string;

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
