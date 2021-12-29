import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notifications', { schema: 'notifications' })
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly userId: number;

  @Column()
  public readonly name: string;

  @Column()
  public readonly isOutdated: boolean;

  @Column({
    type: 'jsonb',
  })
  public readonly payload: Record<string, any>;

  constructor(data) {
    Object.assign(this, data);
  }
}
