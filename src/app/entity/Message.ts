
import {User} from './User';
import {Chat} from './Chat';

export class Message {
  id?: number;
  created?: Date;
  author: User;
  chat?: Chat;
  text: string;

}
