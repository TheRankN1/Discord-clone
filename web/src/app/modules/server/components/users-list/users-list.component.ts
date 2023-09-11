import {Component, OnInit} from '@angular/core';
import {UserCategoryInterface} from '../../../../shared/interfaces/user-category.interface';
import {UserDataBaseInterface} from "../../../../shared/interfaces/user-data-base.interface";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public dataBaseUsers!: Array<UserDataBaseInterface>;
  public categoriesAndUsers: Array<UserCategoryInterface> = [];
  public onlineUsers: Array<UserDataBaseInterface> = []
  public offlineUsers: Array<UserDataBaseInterface> = []
  public loggedUser: UserDataBaseInterface | null = null;

  constructor(private _authService: AuthService) {

  }

  public ngOnInit(): void {
    this._authService.loggedUser$.subscribe(loggedUser => {
      this.loggedUser = loggedUser;
    })
    this._authService.users$.subscribe(users => {
      this.onlineUsers = []
      this.offlineUsers = []
      setInterval(() => {

        const actualDate = new Date();
        [...users].forEach(user => {
          let dateDif = Math.abs(new Date(actualDate).getTime() - new Date(user.lastLogin).getTime());

          if (this.onlineUsers.length + this.offlineUsers.length < users.length) {
            user.status === 'online' ? this.onlineUsers.push(user) : this.offlineUsers.push(user)
          }
          if (user.id === this.loggedUser?.id && user.status === 'offline') {
            user.status = "online"
            this.offlineUsers.splice(this.offlineUsers.indexOf(user), 1)
            if (this.onlineUsers.length + this.offlineUsers.length < users.length) {
              this.onlineUsers.push(user);
            }
          }

          if (dateDif > 6000 && user.id !== this.loggedUser?.id) {
            console.log(user.username)
            user.status = 'offline'
            this.onlineUsers.splice(this.onlineUsers.indexOf(user), 1);
            if (this.offlineUsers.indexOf(user) === -1 && (this.onlineUsers.length + this.offlineUsers.length < users.length)) {
              this.offlineUsers.push(user);
            }
          }



        })
      }, 1000)
    })

    this.categoriesAndUsers = [{
      categoryName: 'Online',
      users: this.onlineUsers
    },
      {
        categoryName: 'Offline',
        users: this.offlineUsers
      }
    ]

  }

  public trackByFn(index: number): number {
    return index;
  }
}
