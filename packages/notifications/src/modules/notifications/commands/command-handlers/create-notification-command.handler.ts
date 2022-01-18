import { CreateNotificationCommand } from '../Impl/create-notification.command';
import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../../repositories/NotificationsRepository';
import { NotificationsGateway } from '../../notifications.gateway';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationCommandHandler
  implements ICommandHandler<CreateNotificationCommand>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
    private readonly publisher: EventPublisher,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async execute(command: CreateNotificationCommand) {
    const notification = await this.repository.write({ ...command });
    this.notificationsGateway.handleNewNotification(notification);
  }
}
