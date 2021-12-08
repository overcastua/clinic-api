import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAccessToken } from './interfaces/access-token.interface';
import { UsersService } from '../users/users.service';
import { Role } from '@repos/common';
import { assertNever } from '@repos/common';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: UsersEntity = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(email: string, role: Role): Promise<IAccessToken> {
    const user: UsersEntity = await this.usersService.findOne(email);
    switch (role) {
      case Role.DOCTOR: {
        const payload = {
          userId: user.id,
          roles: [Role.DOCTOR],
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
      case Role.PATIENT: {
        const payload = {
          userId: user.id,
          roles: [Role.PATIENT],
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
      default:
        return assertNever(role);
    }
  }
}
