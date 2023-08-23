import { Component, OnInit } from '@angular/core';
import { UserDataBaseInterface } from '../../../../interfaces/user-data-base.interface';
import { AuthService } from '../../../../services/auth.service';
import { AvatarUserDatabaseInterface } from '../../../../interfaces/avatar-user-database.interface';
import { AVATAR_USER_MOCK } from '../../../../mocks/logged-user.mock';

@Component({
  selector: 'app-logged-user',
  templateUrl: 'logged-user.component.html',
  styleUrls: ['logged-user.component.scss']
})
export class LoggedUserComponent implements OnInit {
  public user!: UserDataBaseInterface;
  public userAvatar!: AvatarUserDatabaseInterface;
  constructor(private _authService: AuthService) {}

  public ngOnInit(): void {
    this._authService.user$.subscribe(user => {
      this.user = user;
    });
    this.userAvatar = AVATAR_USER_MOCK;
  }
}
