import {Component, Input, OnInit, Output} from '@angular/core';
import {MainPageComponent} from '../main-page/main-page.component';
import {MessengerService} from '../shared/messenger.service';
import {User} from '../entity/User';
import {Chat} from '../entity/Chat';

@Component({
  selector: 'app-build-chat',
  templateUrl: './build-chat.component.html',
  styleUrls: ['./build-chat.component.css']
})
export class BuildChatComponent implements OnInit {

  loginForSearch: string = "";
  chatname: string = "";
  foundUsers: User[] = Array();
  addedUsers: User[] = Array();

  constructor( private _messengerService: MessengerService) { }

  ngOnInit() {
  }


  switchCreatingChat(){
    this._messengerService.creatingChat = !this._messengerService.creatingChat;
  }

  isCreatingChat(){
    return this._messengerService.creatingChat;
  }

  addUser(user : User){
    let arr = this.addedUsers.filter(value => {
      return value.username == user.username;
    });
    if(arr.length == 0 && this._messengerService.user.getValue().username != user.username) {
      this.addedUsers.push(user);
    }

  }

  remove(user : User){
    this.addedUsers = this.addedUsers.filter(value => {
      return value.username != user.username;
    });
    if (this.addedUsers.length < 2){
      this.chatname = "";
    }
  }

  searchUser(){
    this._messengerService.searchUsers(this.loginForSearch)
      .subscribe(
        (res:User[]) => {
          console.log(res);
          this.foundUsers = res;
        },
        err => {
          console.log(err);
        });
  }

  createChat(){
    let chat = new Chat();
    chat.name = this.chatname;
    chat.members = this.addedUsers.map(value => {
      return value.username;
    });

    this._messengerService.createChat(chat)
      .subscribe(
        (res:Chat) => {
          this.switchCreatingChat();
          console.log(res);
          this._messengerService.refreshData();
          this._messengerService.addChat(res);
          this._messengerService.swapCurrentChatById(res.id);
          },
        err => {
          console.log(err);
        }
      );
  }

}
