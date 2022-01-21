import { Module } from '@nestjs/common';
import { NotificationsController } from './notfications.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/command-handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsRepository } from './repositories/NotificationsRepository';
import { QueryHandlers } from './queries/query-handlers';
import { NotificationsService } from './notifications.service';
import { CustomConfigService } from '@repos/common';
import { JwtModule } from '@nestjs/jwt';
import { NewNotificationEvent } from './websocket/events/new-notification';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationsRepository]),
    CqrsModule,
    JwtModule.registerAsync({
      useFactory: (config: CustomConfigService) => {
        return {
          secret: config.get<string>('jwt.secret'),
        };
      },
      inject: [CustomConfigService],
    }),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NewNotificationEvent,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class NotificationsCQRSModule {}
