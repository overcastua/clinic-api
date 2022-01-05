import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';

@Module({
  imports: [CqrsModule],
  providers: [...CommandHandlers, ...EventHandlers],
})
export class LambdaNotifierCQRSModule {}
