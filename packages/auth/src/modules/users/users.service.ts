import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { CreateProfileDto } from '@repos/common';
import { UsersEntity } from './users.entity';
import { ConfigService } from '@nestjs/config';
import { ClinicService } from '../clinic/clinic.service';
import { ProfileService } from '../profile/profile.service';
import { ChangePasswordDto } from './dto/change-password.dto';

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

    const dtoWithHashed = { ...dto };
    dtoWithHashed.password = hash;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, password, ...rest } = dto;

    const user: UsersEntity = await this.usersRepos.register(dtoWithHashed);

    const profileDto = new CreateProfileDto(rest, user.id);

    await this.clinic.createPatient(user.id);
    await this.profile.createProfile(profileDto);
  }

  async findOne(email: string): Promise<UsersEntity> {
    return this.usersRepos.findUser(email);
  }

  async changePassword(dto: ChangePasswordDto, userId: number): Promise<void> {
    const user: UsersEntity = await this.usersRepos.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User with the given id not found');
    }

    if (dto.current === dto.new) {
      throw new ForbiddenException(
        'The new password must be different from your current one',
      );
    }

    if (!(await bcrypt.compare(dto.current, user.password))) {
      throw new ForbiddenException('Current password is incorrect');
    }

    const saltRounds: number = this.config.get('salt');
    const newHashedPassword: string = await bcrypt.hash(dto.new, saltRounds);

    user.password = newHashedPassword;
    return this.usersRepos.updateById(user);
  }
}
