import { EntityRepository, Repository } from 'typeorm';
import { CreatePatientDto } from '../patient/dto/create-patient.dto';
import { ProfileEntity } from './profile.entity';

@EntityRepository(ProfileEntity)
export class ProfileRepository extends Repository<ProfileEntity> {
  async add(createPatientDto: CreatePatientDto): Promise<void> {
    const profile = new ProfileEntity();
    profile.birthDate = createPatientDto.birthDate;
    profile.gender = createPatientDto.gender;
    profile.name = createPatientDto.name;
    if (createPatientDto.patient) {
      profile.patient = createPatientDto.patient;
    }
    await this.save(profile);
  }
}
