import {Component, OnInit} from "@angular/core";
import {UsersInterface} from "../../interfaces/users.interface";
import {USERS_MOCK} from '../../mocks/users.mock'
import {GeneratorHelpers} from "../../helpers/generator.helpers";

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss']
})
export class UsersListComponent implements OnInit{
  public users: Array<UsersInterface> = [];
  public serverBgColor: string = ''

   public ngOnInit(): void{
    this.users = USERS_MOCK;
    this.serverBgColor = GeneratorHelpers.color()
  }
}
