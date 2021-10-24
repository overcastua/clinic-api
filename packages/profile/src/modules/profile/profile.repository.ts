import { CreateProfileDto } from '@repos/common';
import { EntityRepository, Repository } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@EntityRepository(ProfileEntity)
export class ProfileRepository extends Repository<ProfileEntity> {
  async add(createProfileDto: CreateProfileDto): Promise<void> {
    const profile = new ProfileEntity();
    profile.birthDate = createProfileDto.birthDate;
    profile.gender = createProfileDto.gender;
    profile.name = createProfileDto.name;
    profile.userId = createProfileDto.userId;

    await this.save(profile);
  }
  async findProfile(userId: number): Promise<ProfileEntity> {
    return this.findOne({ userId });
  }
}
