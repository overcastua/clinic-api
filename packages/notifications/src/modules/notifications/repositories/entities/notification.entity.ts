import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notifications', { schema: 'notifications' })
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly userId: number;

  @Column()
  public readonly type: string;

  @Column()
  public readonly isSeen: boolean;

  @Column({
    type: 'jsonb',
  })
  public readonly payload: Record<string, any>;

  constructor(data) {
    Object.assign(this, data);
  }
}
