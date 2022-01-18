import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { NotificationEntity } from './repositories/entities/notification.entity';

@WebSocketGateway({ cors: true })
export class NotificationsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly jwtService: JwtService) {}

  verifyUserAndGetId(client: Socket): string {
    let user;

    try {
      const bearerToken: string =
        client.handshake.headers.authorization.split(' ')[1];

      user = this.jwtService.verify(bearerToken);
    } catch (error) {
      console.error(error);
      throw new WsException('Unauthorized');
    }

    if (typeof user.userId === 'number') {
      return user.userId.toString();
    }

    return user.userId;
  }

  async handleConnection(client: Socket): Promise<void> {
    const userId = this.verifyUserAndGetId(client);

    await client.join(userId);
  }

  handleNewNotification(notification: NotificationEntity): void {
    this.server
      .in(notification.userId.toString())
      .emit('new_notification', notification.payload);
  }
}
