import { Pipe, PipeTransform } from '@angular/core';
import { ServerInterface } from '../interfaces/server.interface';

@Pipe({
  name: 'includesServerName'
})
export class IncludesServerNamePipe implements PipeTransform {
  public transform(servers: Array<ServerInterface>, searchServerName: string): Array<ServerInterface> {
    return servers.filter(server => server.title.includes(searchServerName));
  }
}
