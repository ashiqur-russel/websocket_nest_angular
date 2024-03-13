import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  currentUserId = '12345';
  private socket: Socket;
  private readonly url: string = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.url);
  }

  sendMessage(content: any, roomId: string): void {
    this.socket.emit('sendMessage', { content, roomId });
  }

  public getMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (message: any) => {
        message.isOwnMessage = message.senderId === this.currentUserId;
        observer.next(message);
      });
    });
  }

  joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }
  
}
