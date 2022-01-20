import { ICommand } from '@nestjs/cqrs';
import { impl_Notification } from '@repos/common';

export class CreateNotificationCommand
  extends impl_Notification
  implements ICommand
{
  public readonly type: string;
}
