import { Pipe, PipeTransform } from '@angular/core';
import { ChatMessage } from '../interfaces/chat.interface';

@Pipe({
  name: 'checkDifferentDays'
})
export class CheckDifferentDaysPipe implements PipeTransform {
  public transform(messages: Array<ChatMessage>, message: ChatMessage): boolean {
    const index: number = messages.indexOf(message);
    if (index === 0) {
      return true;
    }
    return new Date(messages[index].sentOn).getDay() !== new Date(messages[index - 1].sentOn).getDay();
  }
}
