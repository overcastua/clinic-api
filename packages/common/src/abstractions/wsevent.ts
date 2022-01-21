import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WSEvent {
  @WebSocketServer()
  server: Server;

  protected emitEvent(
    event: string,
    payload: Record<string, any>,
    room?: string,
  ) {
    room
      ? this.server.in(room).emit(event, payload)
      : this.server.emit(event, payload);
  }
}
