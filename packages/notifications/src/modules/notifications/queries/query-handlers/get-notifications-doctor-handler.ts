import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotificationsRepository } from '../../repositories/NotificationsRepository';
import { GetNotificationsDoctorQuery } from '../Impl/get-notifications-doctor-query';
import { InjectRepository } from '@nestjs/typeorm';
import { APPOINTMENT_CREATED } from '../../constants';

@QueryHandler(GetNotificationsDoctorQuery)
export class GetNotificationsDoctorHandler
  implements IQueryHandler<GetNotificationsDoctorQuery>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
  ) {}

  async execute(query: GetNotificationsDoctorQuery) {
    return this.repository.readAll(query.userId, APPOINTMENT_CREATED);
  }
}
