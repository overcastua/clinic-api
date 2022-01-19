import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../../repositories/NotificationsRepository';
import { MarkNotificationsAsSeen } from '../Impl/mark-as-seen.command';

@CommandHandler(MarkNotificationsAsSeen)
export class MarkNotificationsAsSeenCommandHandler
  implements ICommandHandler<MarkNotificationsAsSeen>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: MarkNotificationsAsSeen) {
    const { seenIds: ids } = command;
    const toUpdate = ids.map((id) => ({ id, isSeen: true }));

    await this.repository.save(toUpdate);
  }
}
