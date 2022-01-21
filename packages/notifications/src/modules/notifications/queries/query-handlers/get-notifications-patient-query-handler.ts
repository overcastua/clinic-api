import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotificationsRepository } from '../../repositories/NotificationsRepository';
import { GetNotificationsDoctorQuery } from '../Impl/get-notifications-doctor-query';
import { InjectRepository } from '@nestjs/typeorm';
import { RESOLUTION_CREATED } from '../../constants';
import { GetNotificationsPatientQuery } from '../Impl/get-notifications-patient-query';

@QueryHandler(GetNotificationsPatientQuery)
export class GetNotificationsPatientHandler
  implements IQueryHandler<GetNotificationsPatientQuery>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
  ) {}

  async execute(query: GetNotificationsPatientQuery) {
    return this.repository.readAll(query.userId, RESOLUTION_CREATED);
  }
}
