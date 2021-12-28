import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppointmentCreatedRepository } from '../../repositories/AppointmentCreated.repository';
import { GetNotificationsDoctorQuery } from '../Impl/get-notifications-doctor-query';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(GetNotificationsDoctorQuery)
export class GetNotificationsDoctorHandler
  implements IQueryHandler<GetNotificationsDoctorQuery>
{
  constructor(
    @InjectRepository(AppointmentCreatedRepository)
    private readonly repository: AppointmentCreatedRepository,
  ) {}

  async execute(query: GetNotificationsDoctorQuery) {
    return this.repository.readAll(query.userId);
  }
}
