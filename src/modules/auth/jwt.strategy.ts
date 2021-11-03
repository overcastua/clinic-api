import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const patientId = payload.patientId;
    if (patientId) {
      return { patientId, roles: payload.roles, userId: payload.userId };
    }
    const { doctorId } = payload;
    return { doctorId, roles: payload.roles, userId: payload.userId };
  }
}
