import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { CreateProfileDto } from '@repos/common';
import { UsersEntity } from './users.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepos: UsersRepository,
    private axios: HttpService,
  ) {}

  async register(dto: RegisterDto): Promise<void> {
    if (await this.findOne(dto.email)) {
      throw new ConflictException('The email address is already in use');
    }

    const saltRounds = Number.parseInt(process.env.SALT);
    const hash: string = await bcrypt.hash(dto.password, saltRounds);

    const dtoWithHash = { ...dto };
    dtoWithHash.password = hash;

    const user: UsersEntity = await this.usersRepos.register(dtoWithHash);

    const patientDto = new CreateProfileDto();
    patientDto.name = dto.name;
    patientDto.birthDate = dto.birthDate;
    patientDto.gender = dto.gender;
    patientDto.userId = user.id;

    const createPatientURI =
      'http://' +
      process.env.CLINIC_URI +
      '/' +
      process.env.API_PREFIX +
      '/patients';

    const createProfileURI =
      'http://' +
      process.env.PROFILE_URI +
      '/' +
      process.env.API_PREFIX +
      '/profiles';

    await this.axios.post(createProfileURI, patientDto).subscribe();
    await this.axios.post(createPatientURI, patientDto).subscribe();
  }

  async findOne(email: string): Promise<UsersEntity> {
    return this.usersRepos.findUser(email);
  }
}
