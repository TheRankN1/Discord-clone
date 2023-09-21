import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoleInterface } from '../interfaces/role.interface';

const ROLES_LOCALSTORAGE_KEY = 'dataBaseRoles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  public roles$: BehaviorSubject<Array<RoleInterface>> = new BehaviorSubject<Array<RoleInterface>>([]);

  public getRolesFromLocalStorage(): void {
    const roles: string | null = localStorage.getItem(ROLES_LOCALSTORAGE_KEY);
    this.roles$.next(roles ? JSON.parse(roles) : []);
  }

  public listenToRolesAndUpdateLocalStorage(): void {
    this.roles$.subscribe({
      next: (roles: Array<RoleInterface> | null) => {
        if (roles) {
          localStorage.setItem(ROLES_LOCALSTORAGE_KEY, JSON.stringify(roles));
        } else {
          localStorage.removeItem(ROLES_LOCALSTORAGE_KEY);
        }
      }
    });
  }
}
