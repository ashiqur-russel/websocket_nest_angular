import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: string[] = [];

  constructor() { }


  handleMessageSend(message:string) {

    console.log(message)
    this.messages.push(message);
  }

}
