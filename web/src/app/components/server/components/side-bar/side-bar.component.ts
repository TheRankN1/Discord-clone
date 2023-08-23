import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../../../services/servers.service';
import { ServerInterface } from '../../../../interfaces/server.interface';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from '../../../../services/modal.service';
import { ModalBase } from '../../../../modals/modal.base';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, ModalBase {
  public servers$!: BehaviorSubject<Array<ServerInterface>>;

  constructor(
    private _serversService: ServersService,
    private _modalService: ModalService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this.servers$ = this._serversService.servers$;
  }

  public trackByFn(index: number) {
    return index;
  }

  public openModalServer(): void {
    this._modalService.openModal({
      onEditMode: false,
      title: 'Create server',
      textInput: '',
      type: 'server',
      placeholder: 'Enter server-details name',
      close: this.onCloseModal.bind(this),
      delete: this.onDeleteServerModal.bind(this),
      save: this.onSaveModal.bind(this),
      create: this.onCreateServerModal.bind(this)
    });
  }

  public onCloseModal(): void {
    console.log('onCloseServerModal');
  }

  public onDeleteServerModal(): void {}

  public onSaveModal(textInput: string): void {
    console.log('onSaveServerModal', textInput);
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
    this._router.navigate(['auth']);
  }
}
