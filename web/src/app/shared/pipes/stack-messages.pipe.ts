import { Pipe, PipeTransform } from '@angular/core';
import { ChatMessage } from '../interfaces/chat.interface';

@Pipe({
  name: 'stackMessages'
})
export class stackMessagesPipe implements PipeTransform {
  public hasSentInTheSameDay(messages: Array<ChatMessage>, message: ChatMessage): boolean {
    const index = messages.indexOf(message);

    const data1 = messages[index].sentOn;
    const data2 = messages[index - 1].sentOn;

    return (
      new Date(data1).getFullYear() === new Date(data2).getFullYear() &&
      new Date(data1).getMonth() === new Date(data2).getMonth() &&
      new Date(data1).getDate() === new Date(data2).getDate()
    );
  }

  transform(messages: Array<ChatMessage>, message: ChatMessage): boolean {
    const index = messages.indexOf(message);

    return messages[index].senderId === messages[index - 1].senderId && this.hasSentInTheSameDay(messages, message);
  }
}
