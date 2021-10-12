import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/modules/users/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PatientService } from 'src/modules/patient/patient.service';
import { IAccessToken } from './interfaces/access-token.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private patientService: PatientService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: UsersEntity = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(email: string): Promise<IAccessToken> {
    const user: UsersEntity = await this.usersService.findOne(email);
    const patient = await this.patientService.findPatientByUser(user);
    const payload = { patientId: patient.id, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
