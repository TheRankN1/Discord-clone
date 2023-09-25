import { Pipe, PipeTransform } from '@angular/core';
import { RoleInterface } from '../../../shared/interfaces/role.interface';
import { UserDataBaseInterface } from '../../../shared/interfaces/user-data-base.interface';
import { ServerInterface } from '../../../shared/interfaces/server.interface';

@Pipe({
  name: 'userRolesOfTheCurrentServer'
})
export class UserRolesOfTheCurrentServerPipe implements PipeTransform {
  public transform(user: UserDataBaseInterface, server: ServerInterface): string {
    const roleIds: Array<string> = server.roles.map(role => role.id);
    const roleFound: Array<RoleInterface> = user.roles?.filter((role: RoleInterface) => roleIds.includes(role.id));

    if (!roleFound) {
      return '';
    }

    return roleFound[0]?.color;
  }
}
