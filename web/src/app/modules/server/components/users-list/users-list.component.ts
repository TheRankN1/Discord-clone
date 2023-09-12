import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserCategoryInterface } from '../../../../shared/interfaces/user-category.interface';
import { UserDataBaseInterface } from '../../../../shared/interfaces/user-data-base.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { interval, startWith, Subject, takeUntil } from 'rxjs';

const INTERVAL_CHECK_ONLINE_STATUS = 5000;

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
    this._initLoggedUserListener();
    const users: Array<UserDataBaseInterface> = this._authService.users$.value;
    this._updateUsersStatuses(users);

    interval(INTERVAL_CHECK_ONLINE_STATUS)
      .pipe(startWith(0), takeUntil(this._destroy$))
      .subscribe({
        next: () => {
          this._updateUsersStatuses(users);
        }
      });
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
