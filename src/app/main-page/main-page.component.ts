import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {MessengerService} from '../shared/messenger.service';
import {User} from '../entity/User';
import {Chat} from '../entity/Chat';
import {Message} from '../entity/Message';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  newMessageText: string = "";
  // currentChat: Chat = this._messengerService.currentChat;


  constructor(private _authService: AuthService,
              private _router : Router,
              private _messengerService: MessengerService) { }

  ngOnInit() {
    this._messengerService.refreshData();
    setInterval(() => this._messengerService.refreshData(), 4000);
  }

  switchCreatingChat(){
    this._messengerService.creatingChat = !this._messengerService.creatingChat;
  }

  isCreatingChat(){
    return this._messengerService.creatingChat;
  }

  logOut() {
    if (confirm('Do you really want to log out?')) {
      this._authService.logOut();
      this._router.navigate(['/login']);
    }
  }

  a(){
    this._messengerService.refreshData();
  }

  swapChat(chat:Chat){
    this._messengerService.swapCurrentChat(chat);
    this.getCurrentMessage(chat);
  }

  sendMessage() {
    if (this.newMessageText == ''){
      return;
    }
    const chat = this._messengerService.currentChat.value;
    const chatId = chat.id;
    if (chatId != null) {
      this._messengerService.sendMessage(this.newMessageText, chatId);
      this.newMessageText = "";
      this.setCurrentMessage(chat);
    }
  }

  map(chat:Chat){
    return chat.messages;
  }

  isMyMessage(message: Message){
    return (this._messengerService.user.getValue().username === message.author.username);
  }

  setCurrentMessage(chat: Chat){
    localStorage.setItem(`mess_chat_ ${chat.id}`, this.newMessageText);
  }

  getCurrentMessage(chat: Chat){
    let mes = localStorage.getItem(`mess_chat_ ${chat.id}`);
    if (mes == null){
      mes = "";
    }
    this.newMessageText = mes;
  }

}
