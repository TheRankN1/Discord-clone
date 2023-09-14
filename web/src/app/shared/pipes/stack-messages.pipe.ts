import { Pipe, PipeTransform } from '@angular/core';
import { ChatMessage } from '../interfaces/chat.interface';

@Pipe({
  name: 'stackMessages'
})
export class StackMessagesPipe implements PipeTransform {
  private _hasSentInTheSameDay(messages: Array<ChatMessage>, message: ChatMessage): boolean {
    const index: number = messages.indexOf(message);
    if (index === 0) {
      return false;
    }

    const lastMessageDate: Date = messages[index].sentOn;
    const previousLastMessageDate: Date = messages[index - 1].sentOn;

    return new Date(previousLastMessageDate).toLocaleDateString() === new Date(lastMessageDate).toLocaleDateString();
  }

  public transform(messages: Array<ChatMessage>, message: ChatMessage): boolean {
    const index: number = messages.indexOf(message);
    if (index === 0) {
      return false;
    }

    return messages[index].senderId === messages[index - 1].senderId && this._hasSentInTheSameDay(messages, message);
  }
}
