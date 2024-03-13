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
    handleEvent(@MessageBody() body: any,@ConnectedSocket() client: Socket,): any {
    console.log(body);
    console.log('connected', client.id);
    this.socket.emit("message",body)
  }

    // Join a room
    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, room: string): void {
      client.join(room); 
    }

    @SubscribeMessage('sendMessage')
    handleSendMessage(client: Socket, { content, roomId }): void {
      console.log(content)
      this.socket.to(roomId).emit('receiveMessage', { content, senderId: client.id });
    }
}
