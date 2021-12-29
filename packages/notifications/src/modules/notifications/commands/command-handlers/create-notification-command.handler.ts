import { CreateNotificationCommand } from '../Impl/create-notification.command';
import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../../repositories/NotificationsRepository';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationCommandHandler
  implements ICommandHandler<CreateNotificationCommand>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateNotificationCommand) {
    return this.repository.write({ ...command });
  }
}
