import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public userDoesntExistError: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}

  public navigateToRegister(): void {
    this._router.navigate(['/auth/register']).then();
  }

  public login(): void {
    if (this._authService.login(this.username, this.password)) {
      this._router.navigate(['/servers']).then();
    } else {
      this.userDoesntExistError = true;
    }
  }
}
