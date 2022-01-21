import { IEvent } from '@nestjs/cqrs';

export class ParameterFetchedEvent implements IEvent {
  constructor(readonly value: string) {}
}
