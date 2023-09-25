import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ServerInterface } from '../../../../shared/interfaces/server.interface';
import { ServersService } from '../../../../shared/services/servers.service';
import { CategoryInterface } from '../../../../shared/interfaces/category.interface';
import { ChannelInterface } from '../../../../shared/interfaces/channel.interface';
import { ModalService } from '../../../../shared/services/modal.service';
import { ChannelTypeEnum } from '../../../../shared/enums/channel-type.enum';
import { UserDataBaseInterface } from '../../../../shared/interfaces/user-data-base.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { ConnectedPosition } from '@angular/cdk/overlay/position/flexible-connected-position-strategy';
import { RolesService } from '../../../../shared/services/roles.service';
import { serversSelectors } from '../../../../store/servers';
import { Store } from '@ngrx/store';

const loggedUserDropdownPosition: ConnectedPosition = {
  originX: 'center',
  originY: 'top',
  overlayX: 'center',
  overlayY: 'bottom',
  offsetX: -170,
  offsetY: 80
};

@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.scss']
})
export class ServerDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('loggedUserPanelRef', { static: true }) public loggedUserPanelRef!: TemplateRef<any>;
  public loggedUserDropdownPosition: ConnectedPosition = loggedUserDropdownPosition;

  public currentServer!: ServerInterface;
  public currentCategory!: CategoryInterface;
  public currentChannel!: ChannelInterface;
  public ChannelTypeEnum: typeof ChannelTypeEnum = ChannelTypeEnum;
  public servers: Array<ServerInterface> = [];
  public loggedUser: UserDataBaseInterface | null = null;
  public isDropServerDownOpen = false;
  public isDropCategoryDownOpen = false;
  public currentCategoryId: string = '';
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _serversService: ServersService,
    private _modalService: ModalService,
    private _authService: AuthService,
    private _rolesService: RolesService,
    private _store: Store
  ) {}

  public ngOnInit(): void {
    this._store
      .select(serversSelectors.selectServers)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (servers: Array<ServerInterface>) => {
          this.servers = servers;
        }
      });

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
    this._serversService.toggleLoggedUserSettingsModal();
  }

  public serverDropDownStateChanged(isOpen: boolean): void {
    this.isDropServerDownOpen = isOpen;
  }

  public categoryDropDownStateChanged(isOpen: boolean, category: CategoryInterface): void {
    this._serversService.currentCategory$.next(category);
    this.currentCategoryId = category.id;
    this.isDropCategoryDownOpen = isOpen;
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

  public openRoleModal(server: ServerInterface): void {
    this._serversService.currentServer$.next(server);
    this._modalService.openModal({
      onEditMode: false,
      title: 'Create role',
      textInput: '',
      color: '',
      type: 'role',
      placeholder: 'Enter role name',
      create: this.onCreateRoleModal.bind(this)
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

  public onCreateRoleModal(roleName: string, type: ChannelTypeEnum, color: string): void {
    this._rolesService.addRole(roleName, color, this.currentServer.id);
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

  public disconnectFromTheChannel(): void {
    this._serversService.disconnectFromChannel();
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

  public joinChannel(channel: ChannelInterface, category: CategoryInterface, server: ServerInterface): void {
    this._serversService.currentCategory$.next(category);
    if (channel.type === ChannelTypeEnum.text) {
      this._serversService.joinTextChannel(channel);
    }

    if (channel.type === ChannelTypeEnum.audio) {
      this._serversService.joinAudioChannel(channel, category, server);
    }
  }

  public trackByFn(index: number): number {
    return index;
  }
}
