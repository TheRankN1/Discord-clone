import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarInitials'
})
export class AvatarInitialsPipe implements PipeTransform {
  public transform(value: string): string {
    const words: Array<string> = value.split(' ');
    const firstLetter: string = words[0].slice(0, 1);
    let secondLetter = '';

    if (words.length > 1) {
      secondLetter = words[words.length - 1].slice(0, 1);
    }

    return (firstLetter + secondLetter).toUpperCase();
  }
}
