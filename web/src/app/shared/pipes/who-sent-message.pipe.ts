import { Pipe, PipeTransform } from '@angular/core';
import { UserDataBaseInterface } from '../interfaces/user-data-base.interface';
import { ChatMessage } from '../interfaces/chat.interface';

@Pipe({
  name: 'whoSentTheMessage'
})
export class WhoSentMessagePipe implements PipeTransform {
  transform(users: Array<UserDataBaseInterface>, message: ChatMessage): UserDataBaseInterface | undefined {
    const foundUser = users.find(user => {
      return user.id === message.senderId;
    });
    if (!foundUser) {
      return;
    }
    return foundUser;
  }
}
