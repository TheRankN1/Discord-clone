import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './index';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  constructor(
    private _actions$: Actions,
    private _router: Router
  ) {}

  public navigateAfterSuccessfulLogin$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(authActions.login),
        tap(() => {
          this._router.navigate(['/servers']).then();
        })
      ),
    { dispatch: false }
  );
}
