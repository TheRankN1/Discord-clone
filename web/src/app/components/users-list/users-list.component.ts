import {Component, OnInit} from "@angular/core";
import {USERS_MOCK} from '../../mocks/users.mock'
import {GeneratorHelpers} from "../../helpers/generator.helpers";
import {UserCategoryInterface} from "../../interfaces/user-category.interface";

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss']
})
export class UsersListComponent implements OnInit{
  public categoryOfUsers!: Array<UserCategoryInterface>;
  public serverBgColor: string = ''

  public ngOnInit(): void{
    this.categoryOfUsers = USERS_MOCK;
    this.serverBgColor = GeneratorHelpers.color()
  }
}
