import { CreateProfileDto } from '@repos/common';
import { EntityRepository, Repository } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@EntityRepository(ProfileEntity)
export class ProfileRepository extends Repository<ProfileEntity> {
  async add(createProfileDto: CreateProfileDto): Promise<void> {
    const profile = new ProfileEntity(createProfileDto);

    await this.save(profile);
  }
  async findProfile(userId: number): Promise<ProfileEntity> {
    return this.findOne({ userId });
  }

  async findBatchByUserIds(users: number[]): Promise<ProfileEntity[]> {
    return this.createQueryBuilder('p')
      .where('p.userId IN (:...users)', {
        users,
      })
      .getMany();
  }
}
