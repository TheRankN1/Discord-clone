import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ServerInterface } from '../../interfaces/server.interface';
import { ServersService } from '../../services/servers.service';
import { CategoryInterface } from '../../interfaces/category.interface';
import { ChannelInterface } from '../../interfaces/channel.interface';
import { ModalService } from '../../services/modal.service';
import { ModalBase } from '../../modals/modal.base';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy, ModalBase {
  public currentServer!: ServerInterface;
  public servers!: Array<ServerInterface>;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _serversService: ServersService,
    private _modalService: ModalService
  ) {}

  public ngOnInit(): void {
    this.servers = this._serversService.servers$.value;
    this._route.paramMap.pipe(takeUntil(this._destroy$)).subscribe({
      next: (params: ParamMap) => {
        const serverId: string | null = params.get('serverId');

        if (!serverId) {
          this._router.navigate(['']).then();
          return;
        }

        this._serversService.setCurrentServer(serverId);
        this._serversService.currentServer$.subscribe(server => (this.currentServer = server));
        if (serverId != this.currentServer.id) {
          this._serversService.makeAllServerInactive();
          this._router.navigate(['']).then();
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // TODO: not completed
  public openCategoryModal(): void {
    this._modalService.openModal({
      onEditMode: true,
      title: 'Create category',
      textInput: '',
      placeholder: 'Enter category name',
      close: this.onCloseCategoryModal,
      delete: this.onDeleteModal,
      save: this.onSaveModal,
      create: this.onCreateModal,
    })
  }

  // TODO: not completed
  public openChannelModal(category: CategoryInterface): void {
    this._modalService.openModal({
      onEditMode: true,
      title: 'Create channel',
      textInput: '',
      placeholder: 'Enter channel name',
      close: this.onCloseCategoryModal,
      delete: this.onDeleteModal,
      save: this.onSaveModal,
      create: this.onCreateModal,
    })
    this._serversService.currentCategory$.next(category);
  }

  public openEditChannelModal(category: CategoryInterface, channel: ChannelInterface): void {
    this._serversService.currentCategory$.next(category);
    this._serversService.currentChannel$.next(channel);
  }

  public openEditCategoryModal(category: CategoryInterface): void {
    this._serversService.currentCategory$.next(category);
  }

  public openEditServerModal(server: ServerInterface): void {
    this.currentServer = this._serversService.currentServer$.value;
  }

  onCloseCategoryModal(): void {
  }

  onCreateModal(): void {
  }

  onDeleteModal(): void {
  }

  onSaveModal(textInput: string): void {
  }

  openModalServer(): void {
  }
}
