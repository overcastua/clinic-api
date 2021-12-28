import { AppointmentCreatedCommand } from '../Impl/appointment-created.command';
import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentCreatedRepository } from '../../repositories/AppointmentCreated.repository';

@CommandHandler(AppointmentCreatedCommand)
export class AppointmentCreatedCommandHandler
  implements ICommandHandler<AppointmentCreatedCommand>
{
  constructor(
    @InjectRepository(AppointmentCreatedRepository)
    private readonly repository: AppointmentCreatedRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AppointmentCreatedCommand) {
    return this.repository.write(command);
  }
}
