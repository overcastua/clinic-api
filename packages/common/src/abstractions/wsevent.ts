import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export abstract class WSEvent<T extends string> {
  protected constructor(protected readonly type: T) {}

  @WebSocketServer()
  server: Server;

  protected emitEvent(payload: Record<string, any>, room?: string) {
    room
      ? this.server.in(room).emit(this.type, payload)
      : this.server.emit(this.type, payload);
  }
}
