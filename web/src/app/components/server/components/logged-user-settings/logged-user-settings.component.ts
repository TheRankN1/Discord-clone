import {Component, OnInit} from '@angular/core';
import {UserDataBaseInterface} from '../../../../interfaces/user-data-base.interface';
import {AuthService} from '../../../../services/auth.service';
import {ServersService} from '../../../../services/servers.service';

@Component({
  selector: 'app-logged-user-settings',
  templateUrl: 'logged-user-settings.component.html',
  styleUrls: ['logged-user-settings.component.scss']
})
export class LoggedUserSettingsComponent implements OnInit {
  public loggedUser: UserDataBaseInterface | null = null;

  constructor(
    private _authService: AuthService,
    private _serversService: ServersService
  ) {
  }

  public ngOnInit(): void {
    this.loggedUser = this._authService.loggedUser$.value;
  }

  public closeLoggedUserSettingsModal(): void {
    this._serversService.closeLoggedUserSettingsModal();
  }
}
