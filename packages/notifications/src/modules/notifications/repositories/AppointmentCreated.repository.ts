import { Repository, EntityRepository } from 'typeorm';
import { AppointmentCreatedEntity } from './entities/appointment-created.entity';
import { AppointmentCreatedCommand } from '../commands/Impl/appointment-created.command';

@EntityRepository(AppointmentCreatedEntity)
export class AppointmentCreatedRepository extends Repository<AppointmentCreatedEntity> {
  async write(
    data: AppointmentCreatedCommand,
  ): Promise<AppointmentCreatedEntity> {
    const event = new AppointmentCreatedEntity({ ...data });

    return this.save(event);
  }

  async readAll(userId: number) {
    return this.find({ where: { doctorUserId: userId } });
  }
}
