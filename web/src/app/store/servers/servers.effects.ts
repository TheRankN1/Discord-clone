import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ModalService, ModalState } from '../../shared/services/modal.service';
import { serversActions } from './index';
import { tap } from 'rxjs';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { ServersService } from '../../shared/services/servers.service';
import { Router } from '@angular/router';

@Injectable()
export class ServersEffects {
  constructor(
    private _actions$: Actions,
    private _modalService: ModalService,
    private _serversService: ServersService,
    private _router: Router
  ) {}

  public openCreateServerModal$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(serversActions.openCreateServerModal),
        tap(({ component }) => {
          const modalSettings: ModalState = {
            onEditMode: false,
            title: 'Create server',
            textInput: '',
            type: 'server',
            placeholder: 'Enter server name',
            create: (component as SideBarComponent).onCreateServerModal.bind(component)
          };
          this._modalService.openModal(modalSettings);
        })
      ),
    { dispatch: false }
  );

  public createServer$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(serversActions.createServer),
        tap(({ title }: { title: string }) => {
          if (!title) {
            return;
          }
          this._serversService.addServer(title);
        })
      ),
    { dispatch: false }
  );

  public onServerClicked$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(serversActions.serverSelected),
        tap(({ id }) => {
          this._router.navigate(['/servers/details', id]).then();
        })
      ),
    { dispatch: false }
  );
}
