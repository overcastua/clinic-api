import { Repository, EntityRepository } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';

@EntityRepository(NotificationEntity)
export class NotificationsRepository extends Repository<NotificationEntity> {
  async write(data: Record<string, any>): Promise<NotificationEntity> {
    const event = new NotificationEntity({ ...data });

    return this.save(event);
  }

  async readAll(userId: number, topic: string): Promise<NotificationEntity[]> {
    return this.createQueryBuilder('n')
      .where('n.userId = :userId', { userId })
      .andWhere('n.isSeen = false')
      .andWhere('n.type = :topic', { topic })
      .select(['n.payload'])
      .getMany();
  }
}
