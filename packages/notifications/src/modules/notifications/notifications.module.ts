import { Module } from '@nestjs/common';
import { NotificationsController } from './notfications.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/command-handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsRepository } from './repositories/NotificationsRepository';
import { QueryHandlers } from './queries/query-handlers';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationsRepository]), CqrsModule],
  controllers: [NotificationsController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class NotificationsCQRSModule {}
