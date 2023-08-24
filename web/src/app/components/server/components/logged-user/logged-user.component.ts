import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDataBaseInterface } from '../../../../interfaces/user-data-base.interface';
import { AuthService } from '../../../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-logged-user',
  templateUrl: 'logged-user.component.html',
  styleUrls: ['logged-user.component.scss']
})
export class LoggedUserComponent implements OnInit, OnDestroy {
  public user!: UserDataBaseInterface;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _authService: AuthService) {}

  public ngOnInit(): void {
    this._authService.loggedUser$.pipe(takeUntil(this._destroy$)).subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
