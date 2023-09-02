import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ServerInterface } from '../../../../interfaces/server.interface';
import { ServersService } from '../../../../services/servers.service';
import { CategoryInterface } from '../../../../interfaces/category.interface';
import { ChannelInterface } from '../../../../interfaces/channel.interface';
import { ModalService } from '../../../../services/modal.service';
import { ChannelTypeEnum } from '../../../../enums/channel-type.enum';
import { UserDataBaseInterface } from '../../../../interfaces/user-data-base.interface';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.scss']
})
export class ServerDetailsComponent implements OnInit, OnDestroy {
  public currentServer!: ServerInterface;
  public currentCategory!: CategoryInterface;
  public currentChannel!: ChannelInterface;
  public ChannelTypeEnum: typeof ChannelTypeEnum = ChannelTypeEnum;
  public servers: Array<ServerInterface> = [];
  public loggedUser: UserDataBaseInterface | null = null;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _serversService: ServersService,
    private _modalService: ModalService,
    private _authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.servers = this._serversService.servers$.value;
    this._route.paramMap.pipe(takeUntil(this._destroy$)).subscribe({
      next: (params: ParamMap) => {
        const serverId: string | null = params.get('serverId');

        if (!serverId) {
          this._serversService.makeAllServerInactive();
          return;
        }

        this._serversService.setCurrentServer(serverId);
        combineLatest([this._serversService.currentServer$, this._serversService.currentCategory$, this._serversService.currentChannel$])
          .pipe(takeUntil(this._destroy$))
          .subscribe({
            next: ([server, category, channel]) => {
              this.currentServer = server;
              this.currentCategory = category;
              this.currentChannel = channel;
            }
          });
        if (serverId != this.currentServer.id) {
          this._serversService.makeAllServerInactive();
          this._router.navigate(['']).then();
        }
        this._serversService.resetJoinedUsers();
      }
    });
    this._authService.loggedUser$.pipe(takeUntil(this._destroy$)).subscribe({
      next: (loggedUser: UserDataBaseInterface | null) => {
        this.loggedUser = loggedUser;

        if (!loggedUser) {
          this._router.navigate(['auth/login']).then();
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // ##### SERVER #####

  public openLoggedUserSettingsModal() {
    this._serversService.openLoggedUserSettingsModal();
  }

  public openEditServerModal(server: ServerInterface): void {
    this._serversService.currentServer$.next(server);
    this._modalService.openModal({
      onEditMode: true,
      title: 'Edit server',
      textInput: this.currentServer.title.trim(),
      type: 'server',
      placeholder: 'Enter server name',
      delete: this.onDeleteServerModal.bind(this),
      save: this.onSaveServer.bind(this)
    });
  }

  public leaveServer(server: ServerInterface): void {
    this._serversService.leaveServer(server);
    this._router.navigate(['/servers']).then();
  }

  public onDeleteServerModal(): void {
    this._serversService.deleteServer(this.currentServer.id);
    this._router.navigate(['/servers']).then();
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
      type: 'category',
      placeholder: 'Enter category name',
      delete: this.onDeleteCategoryModal.bind(this),
      save: this.onSaveCategoryModal.bind(this),
      create: this.onCreateCategoryModal.bind(this)
    });
  }

  public openEditCategoryModal(category: CategoryInterface): void {
    this._serversService.currentCategory$.next(category);
    this._modalService.openModal({
      onEditMode: true,
      title: 'Edit category',
      textInput: this.currentCategory.title.trim(),
      placeholder: 'Enter category name',
      type: 'category',
      delete: this.onDeleteCategoryModal.bind(this),
      save: this.onSaveCategoryModal.bind(this),
      create: this.onCreateCategoryModal.bind(this)
    });
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
      type: 'channel',
      placeholder: 'Enter channel name',
      delete: this.onDeleteChannelModal.bind(this),
      save: this.onEditChannelModal.bind(this),
      create: this.onCreateChannelModal.bind(this)
    });
    this._serversService.currentCategory$.next(category);
  }

  public openEditChannelModal(category: CategoryInterface, channel: ChannelInterface): void {
    this._serversService.currentChannel$.next(channel);
    this._serversService.currentCategory$.next(category);
    this._modalService.openModal({
      onEditMode: true,
      title: 'Edit channel',
      textInput: this.currentChannel.title.trim(),
      type: 'channel',
      placeholder: 'Enter channel name',
      delete: this.onDeleteChannelModal.bind(this),
      save: this.onEditChannelModal.bind(this),
      create: this.onCreateChannelModal.bind(this),
      data: {
        channelType: channel.type
      }
    });
  }

  public onCreateChannelModal(channelTitle: string, type: ChannelTypeEnum): void {
    this._serversService.addChannel(channelTitle, this.currentServer.id, this.currentCategory.id, type);
  }

  public onEditChannelModal(channelTitle: string, type: ChannelTypeEnum): void {
    this._serversService.editChannel(channelTitle, this.currentServer.id, this.currentCategory.id, this.currentChannel.id, type);
  }

  public onDeleteChannelModal(): void {
    this._serversService.deleteChannel(this.currentServer.id, this.currentCategory.id, this.currentChannel.id);
  }

  public joinChannel(channel: ChannelInterface, category: CategoryInterface): void {
    if (channel.type === ChannelTypeEnum.text) {
      this._serversService.joinTextChannel(channel);
    }

    if (channel.type === ChannelTypeEnum.audio) {
      this._serversService.joinAudioChannel(channel, category);
    }
  }

  public trackByFn(index: number): number {
    return index;
  }
}
