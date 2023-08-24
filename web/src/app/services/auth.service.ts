import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDataBaseInterface } from '../interfaces/user-data-base.interface';
import { GeneratorHelpers } from '../helpers/generator.helpers';

const USERS_LOCALSTORAGE_KEY = 'databaseUsers';
const USER_LOGGED_KEY = 'loggedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public users$: BehaviorSubject<Array<UserDataBaseInterface>> = new BehaviorSubject<Array<UserDataBaseInterface>>([]);
  public loggedUser$: BehaviorSubject<UserDataBaseInterface> = new BehaviorSubject<UserDataBaseInterface>({
    id: '',
    username: '',
    fullName: '',
    password: '',
    bgColor: ''
  });

  public addUser(username: string, password: string, fullName: string): boolean {
    const users: Array<UserDataBaseInterface> = this.users$.value;
    const foundUsername: UserDataBaseInterface | undefined = users.find((user: UserDataBaseInterface) => {
      return user.username === username;
    });
    if (!foundUsername) users.push({ id: GeneratorHelpers.uuid(), username, password, bgColor: GeneratorHelpers.color() , fullName:fullName});
    this.users$.next(users);
    localStorage.setItem(USERS_LOCALSTORAGE_KEY, JSON.stringify(users));

    return !!foundUsername;
  }

  public login(username: string, password: string): boolean {
    const users: Array<UserDataBaseInterface> = this.users$.value;
    const foundUser: UserDataBaseInterface | undefined = users.find((user: UserDataBaseInterface) => {
      return user.username === username && user.password === password;
    });
    if (foundUser) {
      localStorage.setItem(USER_LOGGED_KEY, JSON.stringify(foundUser));
      this.loggedUser$.next(foundUser);
    }
    return !!foundUser;
  }

  public getUsersFromLocalStorage(): void {
    const users: string | null = localStorage.getItem(USERS_LOCALSTORAGE_KEY);
    this.users$.next(users ? JSON.parse(users) : []);
  }

  public getLoggedUserFromLocalStorage(): void {
    const loggedUser: string | null = localStorage.getItem(USER_LOGGED_KEY);
    this.loggedUser$.next(loggedUser ? JSON.parse(loggedUser) : {});
  }

  public logoutFromLocalStorage(): void{
    this.loggedUser$.next({ id: '',
      username: '',
      fullName: '',
      password: '',
      bgColor: ''});
    localStorage.removeItem(USER_LOGGED_KEY);
  }

  public listenToUsersAndUpdateLocalStorage(): void {
    this.users$.subscribe({
      next: (users: Array<UserDataBaseInterface>) => {
        localStorage.setItem(USERS_LOCALSTORAGE_KEY, JSON.stringify(users));
      }
    });
  }
  public listenToDataBaseUserAndUpdateLocalStorage(): void {
    this.loggedUser$.subscribe({
      next: (user: UserDataBaseInterface) => {
        localStorage.setItem(USER_LOGGED_KEY, JSON.stringify(user));
      }
    });
  }
}
