import {Component, OnInit} from "@angular/core";
import {UserDataBaseInterface} from "../../../../interfaces/user-data-base.interface";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector:'app-logged-user-settings',
  templateUrl:'logged-user-settings.component.html',
  styleUrls:['logged-user-settings.component.scss']
})
export class LoggedUserSettingsComponent implements OnInit{
  public loggedUser !: UserDataBaseInterface | null;

  constructor(private _authService : AuthService) {
  }

  public ngOnInit(): void{
    this.loggedUser = this._authService.loggedUser$.value
  }

}
