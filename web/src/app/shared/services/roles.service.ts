import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoleInterface } from '../interfaces/role.interface';
import { ServerInterface } from '../interfaces/server.interface';
import { GeneratorHelpers } from '../helpers/generator.helpers';
import { ServersService } from './servers.service';

const ROLES_LOCALSTORAGE_KEY = 'dataBaseRoles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  public roles$: BehaviorSubject<Array<RoleInterface>> = new BehaviorSubject<Array<RoleInterface>>([]);

  constructor(private _serversService: ServersService) {}

  public getRolesFromLocalStorage(): void {
    const roles: string | null = localStorage.getItem(ROLES_LOCALSTORAGE_KEY);
    this.roles$.next(roles ? JSON.parse(roles) : []);
  }

  public addRole(roleName: string, color: string, serverId: string): void {
    const servers: Array<ServerInterface> = this._serversService.servers$.value;
    const roles: Array<RoleInterface> = this.roles$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }

    if (!foundServer.roles) {
      foundServer.roles = [];
    }

    foundServer.roles.push({
      id: GeneratorHelpers.uuid(),
      name: roleName,
      color: color,
      serverId: serverId
    });
    roles.push(foundServer.roles[foundServer.roles.length - 1]);
    this.roles$.next(roles);
    this._serversService.servers$.next(servers);
    this._serversService.currentServer$.next({ ...foundServer });
  }

  public listenToRolesAndUpdateLocalStorage(): void {
    this.roles$.subscribe({
      next: (roles: Array<RoleInterface> | null) => {
        if (roles) {
          localStorage.setItem(ROLES_LOCALSTORAGE_KEY, JSON.stringify(roles));
        } else {
          localStorage.removeItem(ROLES_LOCALSTORAGE_KEY);
        }
      }
    });
  }
}
