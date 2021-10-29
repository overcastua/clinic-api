import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { CreateProfileDto } from '@repos/common';
import { UsersEntity } from './users.entity';
import { ConfigService } from '@nestjs/config';
import { ClinicService } from '../clinic/clinic.service';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepos: UsersRepository,
    private config: ConfigService,
    private clinic: ClinicService,
    private profile: ProfileService,
  ) {}

  async register(dto: RegisterDto): Promise<void> {
    if (await this.findOne(dto.email)) {
      throw new ConflictException('The email address is already in use');
    }

    const saltRounds: number = this.config.get('salt');
    const hash: string = await bcrypt.hash(dto.password, saltRounds);

    const dtoWithHash = { ...dto };
    dtoWithHash.password = hash;

    const user: UsersEntity = await this.usersRepos.register(dtoWithHash);

    const patientDto = new CreateProfileDto();
    patientDto.name = dto.name;
    patientDto.birthDate = dto.birthDate;
    patientDto.gender = dto.gender;
    patientDto.userId = user.id;

    await this.clinic.createPatient(patientDto);
    return this.profile.createProfile(patientDto);
  }

  async findOne(email: string): Promise<UsersEntity> {
    return this.usersRepos.findUser(email);
  }
}
