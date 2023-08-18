import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ServerInterface } from '../../interfaces/server.interface';
import { ServersService } from '../../services/servers.service';
import { CategoryInterface } from '../../interfaces/category.interface';
import { ChannelInterface } from '../../interfaces/channel.interface';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy {
  public currentServer!: ServerInterface;
  public currentCategory!: CategoryInterface;
  public currentChannel!: ChannelInterface;
  public servers!: Array<ServerInterface>;
  public isHoveredAdd = false;
  public isHoveredPen = false;
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
        this._serversService.currentCategory$.subscribe(category => (this.currentCategory = category));
        this._serversService.currentChannel$.subscribe(channel => (this.currentChannel = channel));
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

  // ##### SERVER #####

  public openEditServerModal(server: ServerInterface): void {
    this._modalService.openModal({
      onEditMode: true,
      title: 'Edit server',
      textInput: '',
      placeholder: 'Enter server name',
      delete: this.onDeleteServerModal.bind(this),
      save: this.onSaveServer.bind(this)
    });
    this._serversService.currentServer$.next(server);
  }
  public onDeleteServerModal(): void {
    this._serversService.deleteServer(this.currentServer.id);
    this._router.navigate(['/servers']);
  }
  public onSaveServer(textInput: string): void {
    this._serversService.editServer(textInput, this.currentServer.id);
  }

  // ##### CATEGORIES #####

  public openCategoryModal(): void {
    this._modalService.openModal({
      onEditMode: false,
      title: 'Create category',
      textInput: '',
      placeholder: 'Enter category name',
      delete: this.onDeleteCategoryModal.bind(this),
      save: this.onSaveCategoryModal.bind(this),
      create: this.onCreateCategoryModal.bind(this)
    });
  }
  public openEditCategoryModal(category: CategoryInterface): void {
    this._modalService.openModal({
      onEditMode: true,
      title: 'Edit category',
      textInput: '',
      placeholder: 'Enter category name',
      delete: this.onDeleteCategoryModal.bind(this),
      save: this.onSaveCategoryModal.bind(this),
      create: this.onCreateCategoryModal.bind(this)
    });
    this._serversService.currentCategory$.next(category);
  }
  public onCreateCategoryModal(categoryTitle: string): void {
    this._serversService.addCategory(categoryTitle, this.currentServer.id);
  }
  public onSaveCategoryModal(categoryTitle: string): void {
    this._serversService.editCategory(categoryTitle, this.currentServer.id, this.currentCategory.id);
  }
  public onDeleteCategoryModal(): void {
    this._serversService.deleteCategory(this.currentServer.id, this.currentCategory.id);
  }

  // ##### CHANNELS #####
  public openCreateChannelModal(category: CategoryInterface): void {
    this._modalService.openModal({
      onEditMode: false,
      title: 'Create channel',
      textInput: '',
      placeholder: 'Enter channel name',
      delete: this.onDeleteChannelModal.bind(this),
      save: this.onEditChannelModal.bind(this),
      create: this.onCreateChannelModal.bind(this)
    });
    this._serversService.currentCategory$.next(category);
  }
  public openEditChannelModal(category: CategoryInterface, channel: ChannelInterface): void {
    this._modalService.openModal({
      onEditMode: true,
      title: 'Edit channel',
      textInput: '',
      placeholder: 'Enter channel name',
      delete: this.onDeleteChannelModal.bind(this),
      save: this.onEditChannelModal.bind(this),
      create: this.onCreateChannelModal.bind(this)
    });
    this._serversService.currentChannel$.next(channel);
    this._serversService.currentCategory$.next(category);
  }
  public onCreateChannelModal(channelTitle: string): void {
    this._serversService.addChannel(channelTitle, this.currentServer.id, this.currentCategory.id);
  }
  public onEditChannelModal(channelTitle: string): void {
    this._serversService.editChannel(channelTitle, this.currentServer.id, this.currentCategory.id, this.currentChannel.id);
  }
  public onDeleteChannelModal(): void {
    this._serversService.deleteChannel(this.currentServer.id, this.currentCategory.id, this.currentChannel.id);
  }
}
