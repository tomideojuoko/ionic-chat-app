import { Component } from '@angular/core';
import { ChatService, Member, Message } from '../services/chat.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  members: Member[] = [];
  messages: Message[] = [];
  messageContent1: string = '';
  messageContent2: string = '';

  constructor(private chatService: ChatService) {
    this.chatService.members$.subscribe((members) => {
      this.members = members;
    });

    this.chatService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  sendMessage1() {
    const message: Message = {
      memberId: 'Paul', 
      content: this.messageContent1,
      timestamp: new Date().toLocaleString(),
    };
    this.chatService.sendMessage(message);
    this.messageContent1 = '';
  }

  sendMessage2() {
    const message: Message = {
      memberId: 'Mary', 
      content: this.messageContent2,
      timestamp: new Date().toLocaleString(),
    };
    this.chatService.sendMessage(message);
    this.messageContent2 = '';
  }
}

