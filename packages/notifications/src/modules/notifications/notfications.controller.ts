import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Message } from 'kafkajs';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AppointmentCreatedCommand } from './commands/Impl/appointment-created.command';
import { GetUid, JwtAuthGuard, Role, Roles, RolesGuard } from '@repos/common';
import { GetNotificationsDoctorQuery } from './queries/Impl/get-notifications-doctor-query';

@Controller()
export class NotificationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern('notify.patient.create.appointment')
  notifyDoctorAppointmentCreated(@Payload() message: Message): void {
    this.commandBus.execute(new AppointmentCreatedCommand(message.value));
  }

  @Get('doctors/me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.DOCTOR)
  async getNotificationsDoctor(@GetUid() userId: number) {
    return this.queryBus.execute(new GetNotificationsDoctorQuery(userId));
  }
}
