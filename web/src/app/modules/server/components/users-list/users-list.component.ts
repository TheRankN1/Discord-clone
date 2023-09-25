import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserCategoryInterface } from '../../../../shared/interfaces/user-category.interface';
import { UserDataBaseInterface } from '../../../../shared/interfaces/user-data-base.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { interval, startWith, Subject, takeUntil } from 'rxjs';
import { ServersService } from '../../../../shared/services/servers.service';
import { ServerInterface } from '../../../../shared/interfaces/server.interface';
import { RoleInterface } from '../../../../shared/interfaces/role.interface';

const INTERVAL_CHECK_ONLINE_STATUS = 5000;

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  public categoriesAndUsers: Array<UserCategoryInterface> = [];
  public loggedUser: UserDataBaseInterface | null = null;
  public currentServer!: ServerInterface;
  public users!: Array<UserDataBaseInterface>;
  private _destroy$ = new Subject<void>();

  constructor(
    private _authService: AuthService,
    private _serversService: ServersService
  ) {}

  public ngOnInit(): void {
    this._initLoggedUserListener();
    this._authService.users$.pipe(takeUntil(this._destroy$)).subscribe({
      next: users => (this.users = [...users])
    });
    const users = this._authService.users$.value;

    interval(INTERVAL_CHECK_ONLINE_STATUS)
      .pipe(startWith(0), takeUntil(this._destroy$))
      .subscribe({
        next: () => {
          this._updateUsersStatuses(users);
        }
      });
    this._serversService.currentServer$.pipe(takeUntil(this._destroy$)).subscribe({
      next: server => {
        this.currentServer = { ...server };
      }
    });
  }

  public userRolesId(user: UserDataBaseInterface): Array<string> {
    return user.roles.map(role => role.id);
  }

  public serverRolesId(server: ServerInterface): Array<string> {
    return server.roles.map(role => role.id);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public trackByFn(index: number): number {
    return index;
  }

  private _updateUsersStatuses(users: Array<UserDataBaseInterface> = []): void {
    this._initCategoriesAndUsers();

    const onlineUsers: UserCategoryInterface | undefined = this.categoriesAndUsers.find(data => data.categoryName === 'online');
    const offlineUsers: UserCategoryInterface | undefined = this.categoriesAndUsers.find(data => data.categoryName === 'offline');
    const now: Date = new Date();

    users.forEach((user: UserDataBaseInterface) => {
      let dateDiffMilliseconds: number = Math.abs(now.getTime() - new Date(user.lastLogin).getTime());
      if (user.id === this.loggedUser?.id || dateDiffMilliseconds < 10000) {
        user.status = 'online';
        onlineUsers?.users.push(user);
      } else {
        user.status = 'offline';
        offlineUsers?.users.push(user);
      }
    });
  }

  public addRole(role: RoleInterface, dBuser: UserDataBaseInterface): void {
    const users: Array<UserDataBaseInterface> = this._authService.users$.value;
    if (!this.userRolesId(dBuser).includes(role.id)) dBuser.roles.push(role);
    users.forEach((user: UserDataBaseInterface) => {
      if (user.id === dBuser.id) {
        user = dBuser;
      }
    });
    this._authService.users$.next(users);
  }

  public deleteRole(role: RoleInterface, dbUser: UserDataBaseInterface): void {
    const users = this._authService.users$.value;
    users.forEach(user => {
      if (dbUser.id === user.id) {
        dbUser = user;
      }
    });
    dbUser.roles.forEach((dBuserRole: RoleInterface) => {
      const roleIndex = dbUser.roles.indexOf(dBuserRole);

      if (dBuserRole.id === role.id) {
        if (roleIndex === dbUser.roles.length - 1) {
          dbUser.roles.splice(roleIndex, 2);
        } else {
          dbUser.roles.splice(roleIndex, 1);
        }
      }
    });
    users.forEach(user => {
      if (dbUser.id === user.id) {
        user.roles = dbUser.roles;
      }
    });
    this._authService.users$.next(users);
  }

  public toggleRole(role: RoleInterface, dbUser: UserDataBaseInterface): void {
    const users = this._authService.users$.value;
    users.forEach(user => {
      if (dbUser.id === user.id) {
        dbUser = user;
      }
    });
    if (dbUser.roles.length === 0) {
      this.addRole(role, dbUser);
      return;
    }
    dbUser.roles.forEach((dBuserRole: RoleInterface) => {
      if (dBuserRole.id !== role.id) {
        this.addRole(role, dbUser);
        return;
      }

      if (dBuserRole.id === role.id) {
        this.deleteRole(role, dbUser);
        return;
      }
    });
  }

  private _initLoggedUserListener(): void {
    this._authService.loggedUser$.pipe(takeUntil(this._destroy$)).subscribe({
      next: loggedUser => {
        this.loggedUser = loggedUser;
      }
    });
  }

  private _initCategoriesAndUsers(): void {
    this.categoriesAndUsers = [
      {
        categoryName: 'online',
        users: []
      },
      {
        categoryName: 'offline',
        users: []
      }
    ];
  }
}
