import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent {
  public username: string = '';
  public password: string = '';
  public fullName: string = '';
  public usernameTakenError: boolean = false;
  public userCreated: boolean = false;
  public registerErrorUsername: boolean = false;
  public registerErrorPassword: boolean = false;
  public registerErrorNameAndPassword: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}

  public navigateToLogin(): void {
    this._router.navigate(['/auth/login']).then();
  }

  public register(): void {
    if (this.username === '') {
      this.registerErrorUsername = true;
    }

    if (this.password === '') {
      this.registerErrorPassword = true;
    }

    if (this.username === '' && this.password === '') {
      this.registerErrorNameAndPassword = true;
      this.registerErrorPassword = false;
      this.registerErrorUsername = false;
    }

    if (!this._authService.addUser(this.username, this.password, this.fullName)) {
      this._authService.addUser(this.username, this.password, this.fullName);
      this.userCreated = true;
      this.usernameTakenError = false;
      this._router.navigate(['/auth/login']).then();
    } else {
      this.usernameTakenError = true;
      if (this.registerErrorNameAndPassword || this.registerErrorUsername || this.registerErrorPassword) {
        this.usernameTakenError = false;
      }
      this.userCreated = false;
    }
  }

  public clearError(): void {
    this.usernameTakenError = false;
    this.registerErrorUsername = false;
    this.registerErrorPassword = false;
    this.registerErrorNameAndPassword = false;
  }
}
