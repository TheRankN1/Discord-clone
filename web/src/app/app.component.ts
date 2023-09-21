import { Component, OnInit } from '@angular/core';
import { ServersService } from './shared/services/servers.service';
import { AuthService } from './shared/services/auth.service';
import { RolesService } from './shared/services/roles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _serverService: ServersService,
    private _authService: AuthService,
    private _rolesService: RolesService
  ) {}

  public ngOnInit(): void {
    this._serverService.getServersFromLocalStorage();
    this._serverService.listenToServersAndUpdateLocalStorage();
    this._authService.getUsersFromLocalStorage();
    this._authService.getLoggedUserFromLocalStorage();
    this._authService.listenToUsersAndUpdateLocalStorage();
    this._authService.listenToDataBaseUserAndUpdateLocalStorage();
    this._rolesService.getRolesFromLocalStorage();
    this._rolesService.listenToRolesAndUpdateLocalStorage();
  }
}
