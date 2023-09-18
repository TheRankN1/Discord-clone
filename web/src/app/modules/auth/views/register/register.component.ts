import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { ConnectedPosition } from '@angular/cdk/overlay/position/flexible-connected-position-strategy';

const dropDownPosition: ConnectedPosition = {
  originX: 'center',
  originY: 'top',
  overlayX: 'center',
  overlayY: 'bottom',
  offsetX: 0,
  offsetY: 0
};

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public fullName: string = '';
  public email: string = '';
  public days: Array<number> = [];
  public months: Array<string> = [];
  public years: Array<number> = [];
  public day: string | number = 'Day';
  public month: string = 'Month';
  public year: string | number = 'Year';
  public usernameTakenError: boolean = false;
  public userCreated: boolean = false;
  public registerErrorUsername: boolean = false;
  public registerErrorPassword: boolean = false;
  public registerErrorNameAndPassword: boolean = false;
  public dropDownPosition: ConnectedPosition = dropDownPosition;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.day = 'Day';
    this.month = 'Month';
    this.year = 'Year';
    for (let day = 1; day <= 31; day++) {
      this.days.push(day);
    }
    this.months = [
      'Ianuarie',
      'Februarie',
      'Martie',
      'Aprilie',
      'Mai',
      'Iunie',
      'Iulie',
      'August',
      'Septembrie',
      'Octombrie',
      'Noiembrie',
      'Decembrie'
    ];
    const currentYear = new Date().getFullYear();
    for (let year = 1871; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  public navigateToLogin(): void {
    this._router.navigate(['/auth/login']).then();
  }

  public assignDay(day: number): void {
    this.day = day;
  }

  public assignMonth(month: string): void {
    this.month = month;
  }

  public assignYear(year: number): void {
    this.year = year;
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

    if (!this._authService.addUser(this.username, this.password, this.fullName, this.email, this.day, this.month, this.year)) {
      this._authService.addUser(this.username, this.password, this.fullName, this.email, this.day, this.month, this.year);
      this.userCreated = true;
      this.usernameTakenError = false;
      this._router.navigate(['/auth/login']).then();
    } else {
      this.usernameTakenError = !(this.registerErrorNameAndPassword || this.registerErrorUsername || this.registerErrorPassword);
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
