import {
  OnGatewayConnection,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class VerificationGateway implements OnGatewayConnection {
  constructor(private readonly jwtService: JwtService) {}

  verifyUserAndGetId(client: Socket): string {
    let user;

    try {
      const bearerToken = client.handshake.headers.authorization.split(' ')[1];

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
}
