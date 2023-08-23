import { Component, OnInit } from '@angular/core';
import { ServersService } from './services/servers.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _serverService: ServersService,
    private _authService: AuthService
  ) {}

  public ngOnInit(): void {
    this._serverService.getServersFromLocalStorage();
    this._serverService.listenToServersAndUpdateLocalStorage();
    this._authService.getUsersFromLocalStorage();
    this._authService.getLoggedUserFromLocalStorage();
    this._authService.listenToUsersAndUpdateLocalStorage();
    this._authService.listenToDataBaseUserAndUpdateLocalStorage();
  }
}
