import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CustomConfigService } from '../config/params.service';

@Injectable()
export class GrpcGuard implements CanActivate {
  constructor(private readonly configService: CustomConfigService) {}
  canActivate(context: ExecutionContext) {
    const arr = context.getArgs()[1]?.internalRepr.get('token');
    const token = arr ? arr[0] : null;

    return token === this.configService.get<string>('jwt.secret');
  }
}
