import { ICommand } from '@nestjs/cqrs';
import { AppointmentCreatedEvent } from '@repos/common';

export class AppointmentCreatedCommand
  extends AppointmentCreatedEvent
  implements ICommand {}
