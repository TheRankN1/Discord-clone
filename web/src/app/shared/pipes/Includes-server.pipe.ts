import { Pipe, PipeTransform } from '@angular/core';
import { ServerInterface } from '../interfaces/server.interface';

@Pipe({
  name: 'alreadyJoined'
})
export class AlreadyJoinedPipe implements PipeTransform {
  public transform(loggedUserServers: Array<ServerInterface> | null, server: ServerInterface): boolean {
    return loggedUserServers ? loggedUserServers.includes(server) : false;
  }
}
