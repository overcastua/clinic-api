import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUid = createParamDecorator(
  (_data, context: ExecutionContext): any => {
    const req = context.switchToHttp().getRequest();

    if (typeof req.user.userId === 'string') {
      return parseInt(req.user.userId);
    }

    return req.user.userId;
  },
);
