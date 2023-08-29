import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includesServerName'
})
export class IncludesServerNamePipe implements PipeTransform {
  public transform(currentServerName: string, searchServerName: string): boolean {
    return currentServerName.includes(searchServerName);
  }
}
