
import {Component, OnInit} from '@angular/core';
import {USERS_MOCK} from '../../mocks/users.mock';
import {UserCategoryInterface} from '../../interfaces/user-category.interface';


@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public categoryOfUsers!: Array<UserCategoryInterface>;

  public ngOnInit(): void {
    this.categoryOfUsers = USERS_MOCK;
  }
  public trackByFn(index: number): number {
    return index;
  }
}
