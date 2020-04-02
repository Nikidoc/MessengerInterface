import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from '../entity/User';
import {Chat} from '../entity/Chat';
import {log} from 'util';
import {Message} from '../entity/Message';


@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private _userUrl = "http://localhost:8090/user";
  private _messageUrl = "http://localhost:8090/message";
  private _chatUrl = "http://localhost:8090/chat";

  public user: BehaviorSubject<User> = new BehaviorSubject(new User());

  public chats: BehaviorSubject<Chat[]> = new BehaviorSubject([]);

  public currentChat: BehaviorSubject<Chat> = new BehaviorSubject(new Chat());

  public creatingChat: boolean = false;



  // public currentMessages: BehaviorSubject<Message[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  swapCurrentChatById(chatId: number){
    let chat = this.findChatById(chatId, this.chats.getValue());
    this.swapCurrentChat(chat);
  }

  swapCurrentChat(chat: Chat){
    this.currentChat.next(chat);
  }

  findChatById(id:number, _chats:Chat[]): Chat{
    return _chats.find(i => i.id === id);
  }

  refreshCurrentChat(_chats: Chat[]){
    if (this.currentChat.getValue().id != null) {
      let chat = this.findChatById(this.currentChat.getValue().id, _chats);
      this.currentChat.next(chat);
    }
  }

  refreshData(){
    this.getChats();
    this.getAuthenticatedUser();
  }

  getAuthenticatedUser(){
    return this.http.get(this._userUrl).subscribe(
      (res:User) => {
        this.user.next(res);
        console.log(res);
      },
      err => {
        console.log(err);
      }

    );
  }

  getChats(){
    return this.http.get(`${this._userUrl}/chats`).subscribe(
      (res:Chat[]) => {
        this.chats.next(res);
        console.log(res);
        this.refreshCurrentChat(res);
      },
      err => {
        console.log(err);
      }
    );
  }



  sendMessage(text:string, chatId:number){
    this.addMessage(text);
    return this.http.post(`${this._messageUrl}/sending`, {"text":`${text}`, "chat":`${chatId}`})
      .subscribe(
        res => {
          console.log(res);
          this.refreshData();
        },
        err => {
          console.log(err);
        }
      )
  }

  addChat(chat: Chat){
    let _chats = this.chats.getValue();
    _chats.push(chat);
    this.chats.next(_chats);
  }

  addMessage(text: string){
    let _chat = this.currentChat.getValue();
    let message = new Message();
    message.author = this.user.getValue();
    message.text = text;
    _chat.messages.push(message);
    this.currentChat.next(_chat);
  }

  clear(){
    this.user.next(new User());
    this.chats.next([]);
    this.currentChat.next(new Chat());
  }

  isCurrentChatSelected(){
    return this.currentChat.getValue().id != null;
  }

  createChat(chat: Chat){
    return this.http.post(`${this._chatUrl}/create`, chat);
  }

  searchUsers(username: string){
    let params = new HttpParams();
    params = params.append("like", username);

    console.log(params);
    return this.http.get(`${this._userUrl}/users`,{params:params});
  }


}
