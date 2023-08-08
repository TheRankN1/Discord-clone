import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'TextWithEllipsis' })
export class TextWithEllipsisPipe implements PipeTransform {
  transform(name: string, limit: number = 22): string {
    if (!name) {
      return '';
    }
    return name.length > limit ? name.substring(0, limit) + '...' : name;
  }
}
