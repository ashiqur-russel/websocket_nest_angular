import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;
  private readonly url: string = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.url);
   }

   public sendMessage(message: any): void {
    this.socket.emit('message', message);
  }

  public getMessages = () => {
    return new Observable((observer) => {
      this.socket.on('message', (message: any) => {
        observer.next(message);
      });
    });
  }
  
}
