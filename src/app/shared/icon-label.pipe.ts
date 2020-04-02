import {Pipe, PipeTransform} from '@angular/core';
import {Chat} from '../entity/Chat';
import {User} from '../entity/User';


@Pipe({
  name:'iconLabel'
})
export class IconLabelPipe implements PipeTransform{
  transform(chat: Chat): string {

      if (chat.group) {
        return "G";
      }
      let strings = chat.name.split(" ");
      return strings.map(value => {
        return value.charAt(0);
      }).join("");


  }


}
