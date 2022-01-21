import { ICommand } from '@nestjs/cqrs';

export class MarkNotificationsAsSeen implements ICommand {
  constructor(public readonly seenIds: number[]) {}
}
