import { Component,ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WebSocketService } from '../web-socket.service';

interface ChatMessage {
  content: string;
  isOwnMessage: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewInit {
  messages: any[] = [];
  roomId: string = ''
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private cdr: ChangeDetectorRef,private webSocketService: WebSocketService ) {}


  handleMessageSend(content: string) {
    if (!this.roomId.trim()) {
      console.error('No room ID specified.');
      return;
    }

    const message: ChatMessage = {
      content: content,
      isOwnMessage: true
    };
  
    this.webSocketService.sendMessage(message, this.roomId); 
    this.messages.push(message); 
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.subscribeToMessages();
    this.scrollToBottom();
    this.cdr.detectChanges();
  }

  private subscribeToMessages(): void {
    this.webSocketService.getMessages().subscribe((content: any) => {
      const message: ChatMessage = {
        content: content,
        isOwnMessage: content.senderId === this.webSocketService.currentUserId
      };
      this.messages.push(content);
      console.log(this.messages)
      this.scrollToBottom();
    });
  }

  

  private scrollToBottom(): void {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }, 0);
  }

  joinRoom() {
    if (!this.roomId.trim()) {
      console.error('Please enter a room ID.');
      return;
    }
    this.webSocketService.joinRoom(this.roomId);
  }

}
