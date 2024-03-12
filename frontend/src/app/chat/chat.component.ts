import { Component,ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewInit {
  messages: string[] = [];
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}


  handleMessageSend(message:string) {

    console.log(message)
    this.messages.push(message);
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.cdr.detectChanges();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }, 0);
  }

}
