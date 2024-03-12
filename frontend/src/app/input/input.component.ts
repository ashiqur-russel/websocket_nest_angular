import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  messageControl = new FormControl('');

  @Output() messageSend = new EventEmitter<string>();

  sendMessage() {
    const message = this.messageControl.value?.trim() ?? '';
    if (message) {
      this.messageSend.emit(message);
      this.messageControl.reset();
    }
  }

}
