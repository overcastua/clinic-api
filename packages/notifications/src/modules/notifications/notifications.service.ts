import { NotificationEntity } from './repositories/entities/notification.entity';
import { VerificationGateway } from '@repos/common';
import { NewNotificationEvent } from './websocket/events/new-notification';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { CommandBus } from '@nestjs/cqrs';
import { MarkNotificationsAsSeen } from './commands/Impl/mark-as-seen.command';
import { EVENT_TYPES } from './constants';
import { NotificationsIds } from './websocket/interfaces/notifications-seen';

@Injectable()
export class NotificationsService extends VerificationGateway {
  constructor(
    private readonly newNotificationEvent: NewNotificationEvent,
    private readonly _jwtService: JwtService,
    private readonly commandBus: CommandBus,
  ) {
    super(_jwtService);
  }

  handleNewNotification(notification: NotificationEntity): void {
    this.newNotificationEvent.emit(notification);
  }

  @SubscribeMessage(EVENT_TYPES.NOTIFICATIONS_SEEN)
  handleNotificationsSeen(@MessageBody() data: NotificationsIds): void {
    this.commandBus.execute(new MarkNotificationsAsSeen(data.seen));
  }
}
