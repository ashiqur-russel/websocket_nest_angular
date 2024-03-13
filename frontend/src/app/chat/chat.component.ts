import { Component,ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewInit {
  messages: string[] = [];
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private cdr: ChangeDetectorRef,private webSocketService: WebSocketService ) {}


  handleMessageSend(message:string) {

    console.log(message)
    //this.messages.push(message);
    this.webSocketService.sendMessage(message);
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.subscribeToMessages();
    this.scrollToBottom();
    this.cdr.detectChanges();
  }

  private subscribeToMessages(): void {
    this.webSocketService.getMessages().subscribe((message: any) => {
      console.log(message)
      this.messages.push(message);
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }, 0);
  }

}
