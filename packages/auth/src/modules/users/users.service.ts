import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { CreatePatientDto } from '@repos/common';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepos: UsersRepository,
  ) {}

  async register(dto: RegisterDto): Promise<void> {
    if (await this.findOne(dto.email)) {
      throw new ConflictException('The email address is already in use');
    }

    const saltRounds = Number(process.env.SALT);
    const hash: string = await bcrypt.hash(dto.password, saltRounds);

    const dtoWithHash = { ...dto };
    dtoWithHash.password = hash;

    const user: UsersEntity = await this.usersRepos.register(dtoWithHash);

    const patientDto = new CreatePatientDto();
    patientDto.name = dto.name;
    patientDto.birthDate = dto.birthDate;
    patientDto.gender = dto.gender;
    patientDto.user = user;

    // await this.patientService.create(patientDto);
  }

  async findOne(email: string): Promise<UsersEntity> {
    return this.usersRepos.findUser(email);
  }
}
