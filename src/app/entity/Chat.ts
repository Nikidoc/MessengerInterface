import {Message} from './Message';
import {User} from './User';

export class Chat {
  id: number;
  name: string;
  lastMessage: Message;
  creatorId: User;
  group: boolean;
  messages: Message[];
  members: string[];
}
