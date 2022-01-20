import { CreateNotificationCommand } from '../Impl/create-notification.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../../repositories/NotificationsRepository';
import { NotificationsService } from '../../notifications.service';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationCommandHandler
  implements ICommandHandler<CreateNotificationCommand>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  async execute(command: CreateNotificationCommand) {
    const notification = await this.repository.write({ ...command });
    this.notificationsService.handleNewNotification(notification);
  }
}
