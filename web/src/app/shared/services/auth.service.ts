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
  public loggedUser$: BehaviorSubject<UserDataBaseInterface | null> = new BehaviorSubject<UserDataBaseInterface | null>(null);

  public addUser(
    username: string,
    password: string,
    fullName: string,
    email: string,
    day: string | number,
    month: string,
    year: number | string
  ): boolean {
    if (username === '' || password === '') {
      return true;
    }

    const users: Array<UserDataBaseInterface> = this.users$.value;
    const foundUsername: UserDataBaseInterface | undefined = users.find((user: UserDataBaseInterface) => {
      return user.username === username;
    });

    if (!foundUsername) {
      users.push({
        id: GeneratorHelpers.uuid(),
        username: username,
        password: password,
        bgColor: GeneratorHelpers.color(),
        fullName: fullName,
        servers: [],
        joinedOn: new Date(),
        audioChannelId: '',
        textChannelId: '',
        status: 'online',
        lastLogin: new Date(),
        email: email,
        roles: [],
        birthDate: {
          day: day,
          month: month,
          year: year
        }
      });
      this.users$.next(users);
    }

    return !!foundUsername;
  }

  public login(username: string, password: string): boolean {
    if (username === '' || password === '') {
      return false;
    }

    const users: Array<UserDataBaseInterface> = this.users$.value;
    const foundUser: UserDataBaseInterface | undefined = users.find((user: UserDataBaseInterface) => {
      return (user.username === username && user.password === password) || (user.email === username && user.password === password);
    });

    if (!foundUser) {
      return false;
    }
    foundUser.lastLogin = new Date();
    this.loggedUser$.next(foundUser);

    return !!foundUser;
  }

  public getUsersFromLocalStorage(): void {
    const users: string | null = localStorage.getItem(USERS_LOCALSTORAGE_KEY);
    this.users$.next(users ? JSON.parse(users) : []);
  }

  public getLoggedUserFromLocalStorage(): void {
    const loggedUser: string | null = localStorage.getItem(USER_LOGGED_KEY);
    this.loggedUser$.next(loggedUser ? JSON.parse(loggedUser) : null);
  }

  public logoutFromLocalStorage(): void {
    this.loggedUser$.next(null);
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
      next: (user: UserDataBaseInterface | null) => {
        if (user) {
          localStorage.setItem(USER_LOGGED_KEY, JSON.stringify(user));
        } else {
          localStorage.removeItem(USER_LOGGED_KEY);
        }
      }
    });
  }
}
