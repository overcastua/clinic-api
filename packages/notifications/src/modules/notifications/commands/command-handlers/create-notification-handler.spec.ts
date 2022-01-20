import { Test } from '@nestjs/testing';
import { NotificationsRepository } from '../../repositories/NotificationsRepository';
import { NotificationsService } from '../../notifications.service';
import { NotificationEntity } from '../../repositories/entities/notification.entity';
import { CreateNotificationCommand } from '../Impl/create-notification.command';
import { CreateNotificationCommandHandler } from './create-notification-command.handler';

const reposMock = () => ({
  write: jest.fn(),
});

describe('CreateNotificationCommandHandler', () => {
  let repository: any;
  let service: NotificationsService;
  let handler: CreateNotificationCommandHandler;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateNotificationCommandHandler,
        {
          provide: NotificationsRepository,
          useFactory: reposMock,
        },
        {
          provide: NotificationsService,
          useValue: {
            handleNewNotification: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = modRef.get(NotificationsRepository);
    service = modRef.get(NotificationsService);
    handler = modRef.get(CreateNotificationCommandHandler);
  });

  it('should call service method with notification entity passed as a parameter', async () => {
    const eventType = 'eventName';

    const spyHandleNewNotification = jest.spyOn(
      service,
      'handleNewNotification',
    );

    const data = {
      isSeen: false,
      userId: 141,
      type: eventType,
      payload: { hello: 'world' },
    };

    const notificationsFixture = new NotificationEntity({ id: 1, ...data });
    const command = new CreateNotificationCommand(data);

    repository.write.mockResolvedValue(notificationsFixture);

    await handler.execute(command);

    expect(spyHandleNewNotification).toHaveBeenLastCalledWith(
      notificationsFixture,
    );
    expect(spyHandleNewNotification).toHaveBeenCalledTimes(1);
  });
});
