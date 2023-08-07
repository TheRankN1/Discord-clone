import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isNotEmpty' })
export class IsNotEmptyPipe implements PipeTransform {
  transform(value: string): boolean {
    return value.trim() === '';
  }
}
