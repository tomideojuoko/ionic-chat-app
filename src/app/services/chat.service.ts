import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Member {
  name: string;
  id: string;
}

export interface Message {
  memberId: string;
  content: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private membersSubject = new BehaviorSubject<Member[]>([]);
  private messagesSubject = new BehaviorSubject<Message[]>([]);

  members$ = this.membersSubject.asObservable();
  messages$ = this.messagesSubject.asObservable();

  addMember(member: Member) {
    const currentMembers = this.membersSubject.value;
    this.membersSubject.next([...currentMembers, member]);
  }

  sendMessage(message: Message) {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }
}
