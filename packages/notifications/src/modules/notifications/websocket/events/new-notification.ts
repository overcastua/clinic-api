import { Mutable, WSEvent } from '@repos/common';
import { Injectable } from '@nestjs/common';
import { EVENT_TYPES } from '../../constants';
import { NotificationEntity } from '../../repositories/entities/notification.entity';

@Injectable()
export class NewNotificationEvent extends WSEvent {
  emit(data: NotificationEntity) {
    const room = data.userId.toString();

    const payload = data as Mutable<NotificationEntity>;
    delete payload.userId;

    return this.emitEvent(EVENT_TYPES.NEW_NOTIFICATION, payload, room);
  }
}
