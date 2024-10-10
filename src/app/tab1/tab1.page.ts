import { Component } from '@angular/core';
import { ChatService, Member, Message } from '../services/chat.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  members: Member[] = [];
  messages: Message[] = [];
  messageContent: string = '';

  constructor(private chatService: ChatService) {
    this.chatService.members$.subscribe((members) => {
      this.members = members;
    });

    this.chatService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  joinConversation(name: string) {
    const member = { name, id: new Date().getTime().toString() };
    this.chatService.addMember(member);
  }

  sendMessage() {
    const message: Message = {
      memberId: 'Peter', 
      content: this.messageContent,
      timestamp: new Date().toLocaleString(),
    };
    this.chatService.sendMessage(message);
    this.messageContent = '';
  }

}
