import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'substring'})
export class SubstringPipe implements PipeTransform {
  transform(name: string,): string {
    const channelChars = name.length;
    const maxChars = 22;
    return (channelChars > maxChars) ? (name.substring(0, maxChars) + '...') : name;
  }
}

