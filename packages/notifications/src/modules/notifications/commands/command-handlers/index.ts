import { CreateNotificationCommandHandler } from './create-notification-command.handler';
import { MarkNotificationsAsSeenCommandHandler } from './mark-as-seen-command.handler';

export const CommandHandlers = [
  CreateNotificationCommandHandler,
  MarkNotificationsAsSeenCommandHandler,
];
