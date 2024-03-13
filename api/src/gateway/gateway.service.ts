import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    credentials: true,
  },
})
export class GatewayService {

    @WebSocketServer()
    socket: Socket
    @SubscribeMessage('message')
    handleEvent(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ): any {
    console.log(body);
    console.log('connected', client.id);

    this.socket.emit("message",body)

  }
}
