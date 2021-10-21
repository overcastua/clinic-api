import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePatientDto } from '../patient/dto/create-patient.dto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<void> {
    await this.profileRepository.add(createPatientDto);
  }
}
