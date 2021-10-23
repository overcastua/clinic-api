import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/modules/users/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PatientService } from 'src/modules/patient/patient.service';
import { IAccessToken } from './interfaces/access-token.interface';
import { UsersService } from '../users/users.service';
import { Role } from '@repos/common';
import { DoctorsService } from '../doctors/doctors.service';
import { assertNever } from '@repos/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private patientsService: PatientService,
    private doctorsService: DoctorsService,
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

  async login(email: string, role: Role): Promise<IAccessToken> {
    const user: UsersEntity = await this.usersService.findOne(email);
    switch (role) {
      case Role.DOCTOR: {
        const doctor = await this.doctorsService.findDoctorByUser(user);
        const payload = {
          doctorId: doctor.id,
          userId: user.id,
          roles: [Role.DOCTOR],
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
      case Role.PATIENT: {
        const patient = await this.patientsService.findPatientByUser(user);
        const payload = {
          patientId: patient.id,
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
