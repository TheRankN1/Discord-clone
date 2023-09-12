import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserCategoryInterface } from '../../../../shared/interfaces/user-category.interface';
import { UserDataBaseInterface } from '../../../../shared/interfaces/user-data-base.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

enum UsersCategoriesEnum {
  online = 'Online',
  offline = 'Offline'
}

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  public categoriesAndUsers: Array<UserCategoryInterface> = [];
  public loggedUser: UserDataBaseInterface | null = null;
  private _destroy$ = new Subject<void>();

  constructor(private _authService: AuthService) {}

  public ngOnInit(): void {
    this._initCategoriesAndUsers();
    this._initLoggedUserListener();

    this._authService.users$.pipe(takeUntil(this._destroy$)).subscribe({
      next: (users: Array<UserDataBaseInterface>) => {
        setInterval(() => {
          const now: Date = new Date();
          this._initCategoriesAndUsers();
          const onlineUsersCategory = this.categoriesAndUsers.find(
            categoriesAndUsers => categoriesAndUsers.categoryName === UsersCategoriesEnum.online
          );
          const offlineUsersCategory = this.categoriesAndUsers.find(
            categoriesAndUsers => categoriesAndUsers.categoryName === UsersCategoriesEnum.offline
          );

          users.forEach((user: UserDataBaseInterface) => {
            let dateDifMilliseconds: number = Math.abs(now.getTime() - new Date(user.lastLogin).getTime());

            if (user.id === this.loggedUser?.id || dateDifMilliseconds < 10000) {
              user.status = 'online';
              onlineUsersCategory?.users.push(user);
            } else {
              user.status = 'offline';
              offlineUsersCategory?.users.push(user);
            }
          });

          this.categoriesAndUsers = [...this.categoriesAndUsers];
        }, 1000);
      }
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
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
        categoryName: UsersCategoriesEnum.online,
        users: []
      },
      {
        categoryName: UsersCategoriesEnum.offline,
        users: []
      }
    ];
  }

  public trackByFn(index: number): number {
    return index;
  }
}
