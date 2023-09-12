import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../services/servers.service';
import { ServerInterface } from '../../interfaces/server.interface';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { ModalBase } from '../../modals/modal.base';
import { AuthService } from '../../services/auth.service';
import { sidebarActions } from '../../data/actions.data';
import { SidebarActionInterface } from '../../interfaces/sidebar-action.interface';
import { ServerInitialization } from '../../helpers/server.initialization';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, ModalBase {
  public servers$!: BehaviorSubject<Array<ServerInterface>>;
  public sideBarActions: { [key: string]: SidebarActionInterface } = {};

  constructor(
    private _serversService: ServersService,
    private _modalService: ModalService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  public ngOnInit(): void {
    this._serversService.filterTheLoggedUserServers();
    this.servers$ = this._serversService.loggedUserServers$;
    this.sideBarActions = sidebarActions;
  }

  public trackByFn(index: number): number {
    return index;
  }

  public openModalServer(): void {
    this._modalService.openModal({
      onEditMode: false,
      title: 'Create server',
      textInput: '',
      type: 'server',
      placeholder: 'Enter server name',
      create: this.onCreateServerModal.bind(this)
    });
  }

  public onCreateServerModal(textInput: string): void {
    if (!textInput) {
      return;
    }
    this._serversService.addServer(textInput);
  }

  public onServerDetails(id: string): void {
    this._serversService.isCategoryModalOpen$.next(false);
    this._serversService.setCurrentServer(id);
    this._router.navigate(['/servers/details', id]).then();
  }

  public logout(): void {
    this._authService.logoutFromLocalStorage();
    this._serversService.currentChannel$.next(ServerInitialization.defaultChannel());
    this._router.navigate(['auth/login']).then();
  }

  public onSearchServer() {
    this._router.navigate(['search']).then();
  }
}
