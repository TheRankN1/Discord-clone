import { Pipe, PipeTransform } from '@angular/core';
import { ServerInterface } from '../interfaces/server.interface';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'includesServer'
})
export class IncludesServerPipe implements PipeTransform {
  transform(loggedUserServers$: Array<ServerInterface> | null, server: ServerInterface): boolean {
    return loggedUserServers$ ? loggedUserServers$.includes(server) : false;
  }
}
