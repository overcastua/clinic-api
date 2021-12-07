import { CreateProfileDto, UpdateProfileDto } from '@repos/common';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
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

  async updateProfile(
    dto: UpdateProfileDto,
    userId: number,
  ): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .update()
      .set(dto)
      .where('userId = :userId', { userId })
      .execute();
  }

  async updateProfilePic(link: string, userId: number): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .update()
      .set({
        image: link,
      })
      .where('userId = :userId', { userId })
      .execute();
  }

  async findBatchByUserIds(users: number[]): Promise<ProfileEntity[]> {
    return this.createQueryBuilder('p')
      .where('p.userId IN (:...users)', {
        users,
      })
      .getMany();
  }
}
