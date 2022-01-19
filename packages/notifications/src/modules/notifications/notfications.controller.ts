import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Message } from 'kafkajs';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNotificationCommand } from './commands/Impl/create-notification.command';
import { GetUid, JwtAuthGuard, Role, Roles, RolesGuard } from '@repos/common';
import { GetNotificationsDoctorQuery } from './queries/Impl/get-notifications-doctor-query';
import { APPOINTMENT_CREATED, RESOLUTION_CREATED } from './constants';
import { GetNotificationsPatientQuery } from './queries/Impl/get-notifications-patient-query';

@Controller()
export class NotificationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern('notify.patient.create.appointment')
  createNotificationAppointmentCreated(@Payload() message: Message): void {
    const notification = message.value as Record<string, any>;
    notification.type = APPOINTMENT_CREATED;

    this.commandBus.execute(new CreateNotificationCommand(notification));
  }

  @MessagePattern('notify.doctor.create.resolution')
  createNotificationResolutionCreated(@Payload() message: Message): void {
    const notification = message.value as Record<string, any>;
    notification.type = RESOLUTION_CREATED;

    this.commandBus.execute(new CreateNotificationCommand(notification));
  }

  @Get('doctors/me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.DOCTOR)
  async getNotificationsDoctor(@GetUid() userId: number) {
    return this.queryBus.execute(new GetNotificationsDoctorQuery(userId));
  }

  @Get('patients/me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PATIENT)
  async getNotificationsPatient(@GetUid() userId: number) {
    return this.queryBus.execute(new GetNotificationsPatientQuery(userId));
  }
}
