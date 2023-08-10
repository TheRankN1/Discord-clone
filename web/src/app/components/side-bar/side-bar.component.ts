import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../services/servers.service';
import { ServerInterface } from '../../interfaces/server.interface';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { ModalBase } from '../../modals/modal.base';

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
      onEditMode: true,
      title: 'Create server',
      textInput: '',
      placeholder: 'Enter server name',
      close: this.onCloseModal,
      delete: this.onDeleteModal,
      save: this.onSaveModal,
      create: this.onCreateModal,
    })
  }

  public onCloseModal(): void {
    console.log('onCloseServerModal')
  }

  public onDeleteModal(): void {
    console.log('onDeleteServerModal')
  }

  public onSaveModal(textInput: string): void {
    console.log('onSaveServerModal', textInput)
  }

  public onCreateModal(): void {
    console.log('onCreateServerModal')
  }

  public onServerDetails(id: string) {
    this._serversService.isCategoryModalOpen$.next(false);
    this._serversService.setCurrentServer(id);
    this._router.navigate(['/servers', id]).then();
  }
}
