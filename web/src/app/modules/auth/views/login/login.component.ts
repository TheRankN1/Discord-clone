import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { UserDataBaseInterface } from '../../../../shared/interfaces/user-data-base.interface';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public username: string = '';
  public password: string = '';
  public loginError: boolean = false;
  public loginErrorUsername: boolean = false;
  public loginErrorPassword: boolean = false;
  public loginErrorNameAndPassword: boolean = false;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}

  public ngOnInit(): void {
    this._authService.loggedUser$.pipe(takeUntil(this._destroy$)).subscribe({
      next: (loggedUser: UserDataBaseInterface | null) => {
        if (loggedUser) {
          this._router.navigate(['servers']).then();
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public navigateToRegister(): void {
    this._router.navigate(['/auth/register']).then();
  }

  public login(): void {
    if (this.username === '') {
      this.loginErrorUsername = true;
    }

    if (this.password === '') {
      this.loginErrorPassword = true;
    }

    if (this.username === '' && this.password === '') {
      this.loginErrorNameAndPassword = true;
      this.loginErrorPassword = false;
      this.loginErrorUsername = false;
    }

    if (this._authService.login(this.username, this.password)) {
      this._router.navigate(['/servers']).then();
    } else {
      this.loginError = true;
    }
  }

  public clearError(): void {
    this.loginError = false;
    this.loginErrorUsername = false;
    this.loginErrorPassword = false;
    this.loginErrorNameAndPassword = false;
  }
}
