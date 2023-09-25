import { Injectable } from '@angular/core';
import { ServerInterface } from '../interfaces/server.interface';
import { BehaviorSubject } from 'rxjs';
import { CategoryInterface } from '../interfaces/category.interface';
import { GeneratorHelpers } from '../helpers/generator.helpers';
import { ServerInitialization } from '../helpers/server.initialization';
import { ChannelInterface } from '../interfaces/channel.interface';
import { ChannelTypeEnum } from '../enums/channel-type.enum';
import { AuthService } from './auth.service';
import { UserDataBaseInterface } from '../interfaces/user-data-base.interface';
import { Store } from '@ngrx/store';
import { serversActions, serversSelectors } from '../../store/servers';

const SERVER_LOCALSTORAGE_KEY = 'dataBaseServers';

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  public currentServer$: BehaviorSubject<ServerInterface> = new BehaviorSubject<ServerInterface>(ServerInitialization.defaultServer());
  public currentCategory$: BehaviorSubject<CategoryInterface> = new BehaviorSubject<CategoryInterface>(
    ServerInitialization.defaultCategory()
  );
  public currentChannel$: BehaviorSubject<ChannelInterface> = new BehaviorSubject<ChannelInterface>(ServerInitialization.defaultChannel());
  public servers$: BehaviorSubject<Array<ServerInterface>> = new BehaviorSubject<Array<ServerInterface>>([]);
  public loggedUserServers$: BehaviorSubject<Array<ServerInterface>> = new BehaviorSubject<Array<ServerInterface>>([]);
  public isLoggedSettingsModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private _authService: AuthService,
    private _store: Store
  ) {}

  public addServer(title: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const loggedUser: UserDataBaseInterface | null = this._authService.loggedUser$.value;
    const users: Array<UserDataBaseInterface> = this._authService.users$.value;

    servers.push({
      id: GeneratorHelpers.uuid(),
      title: title,
      isActive: false,
      serverBgColor: GeneratorHelpers.color(),
      categories: [],
      createdBy: this._authService.loggedUser$.value?.id || '',
      createdOn: new Date(),
      roles: []
    });

    if (loggedUser) {
      loggedUser.servers.push(servers[servers.length - 1]?.id);
      users.forEach((user: UserDataBaseInterface, index: number) => {
        if (user.id === loggedUser.id) {
          users[index].servers = loggedUser.servers;
        }
      });
    }

    this.filterTheLoggedUserServers();
    this._authService.loggedUser$.next(loggedUser);
    this._authService.users$.next(users);
    this.servers$.next(servers);
  }

  public addMessage(message: string): void {
    const loggedUser: UserDataBaseInterface | null = this._authService.loggedUser$.value;
    let currentChannel: ChannelInterface | null = this.currentChannel$.value;
    if (!loggedUser) {
      return;
    }

    if (!currentChannel.messages) {
      return;
    }

    currentChannel.messages.push({
      id: GeneratorHelpers.uuid(),
      senderId: loggedUser.id,
      sentOn: new Date(),
      content: message
    });
    this.setCurrentServer(this.currentServer$.value.id);
    this.currentChannel$.next(currentChannel);
  }

  public leaveServer(server: ServerInterface): void {
    const loggedUser: UserDataBaseInterface | null = this._authService.loggedUser$.value;
    loggedUser?.servers.splice(loggedUser?.servers.indexOf(server.id), 1);
    this._authService.loggedUser$.next(loggedUser);
    this.filterTheLoggedUserServers();
  }

  public toggleLoggedUserSettingsModal(): void {
    const isLoggedSettingsModalOpen: boolean = this.isLoggedSettingsModalOpen$.value;
    this.isLoggedSettingsModalOpen$.next(!isLoggedSettingsModalOpen);
  }

  public closeLoggedUserSettingsModal(): void {
    this.isLoggedSettingsModalOpen$.next(false);
  }

  public filterTheLoggedUserServers(): void {
    const loggedUserServerIds: Array<string> = this._authService.loggedUser$.value?.servers || [];
    const servers: Array<ServerInterface> = this.servers$.value;
    const result: Array<ServerInterface> = [];

    if (loggedUserServerIds.length) {
      loggedUserServerIds.forEach((serverId: string) => {
        const serverFound: ServerInterface | undefined = servers.find(server => server.id === serverId);

        if (serverFound) {
          result.push(serverFound);
        }
      });
    }

    this.loggedUserServers$.next(result);
  }

  public joinServer(server: ServerInterface): void {
    const loggedUserServers: Array<ServerInterface> = this.loggedUserServers$.value;
    const loggedUser: UserDataBaseInterface | null = this._authService.loggedUser$.value;

    if (loggedUser) {
      loggedUser.servers.push(server.id);
    }

    loggedUserServers.push(server);
    this._authService.loggedUser$.next(loggedUser);
    this.loggedUserServers$.next(loggedUserServers);
  }

  public joinAudioChannel(channel: ChannelInterface, category: CategoryInterface, server: ServerInterface): void {
    const loggedUser: UserDataBaseInterface | null = this._authService.loggedUser$.value;

    if (!loggedUser) {
      return;
    }

    loggedUser.audioChannelId = channel.id;
    this._authService.loggedUser$.next(loggedUser);
  }

  public disconnectFromChannel(): void {
    const loggedUser: UserDataBaseInterface | null = this._authService.loggedUser$.value;

    if (!loggedUser) {
      return;
    }

    loggedUser.audioChannelId = '';
    loggedUser.textChannelId = '';
  }

  public resetJoinedUsers() {
    const loggedUser = this._authService.loggedUser$.value;
    if (loggedUser) {
      loggedUser.audioChannelId = '';
      loggedUser.textChannelId = '';
    }
    this._authService.loggedUser$.next(loggedUser);
  }

  public joinTextChannel(channel: ChannelInterface): void {
    const loggedUser: UserDataBaseInterface | null = this._authService.loggedUser$.value;

    if (!loggedUser) {
      return;
    }

    loggedUser.textChannelId = channel.id;
    this._authService.loggedUser$.next(loggedUser);
    this.currentChannel$.next(channel);
  }

  public addCategory(category: string, serverId: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;

    const foundServer: ServerInterface | undefined = servers.find((server: ServerInterface) => server.id === serverId);

    if (!foundServer) {
      return;
    }

    foundServer.categories.push({
      title: category,
      id: GeneratorHelpers.uuid(),
      channels: []
    });
    this.servers$.next(servers);
  }

  public addChannel(name: string, serverId: string, categoryId: string, type: ChannelTypeEnum): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }

    const foundCategory: CategoryInterface | undefined = foundServer.categories.find(category => category.id === categoryId);

    if (!foundCategory) {
      return;
    }
    const channelId: string = GeneratorHelpers.uuid();
    foundCategory.channels.push({ title: name, id: channelId, type: type, messages: [] });
    this.servers$.next(servers);
  }

  public editServer(title: string, serverId: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }
    foundServer.title = title;
    this.currentServer$.next({ ...foundServer });
    this.servers$.next(servers);
  }

  public deleteServer(serverId: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }
    servers.splice(servers.indexOf(foundServer), 1);
    this.servers$.next(servers);
    this.filterTheLoggedUserServers();
  }

  public editCategory(title: string, serverId: string, categoryId: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }

    const foundCategory: CategoryInterface | undefined = foundServer.categories.find(category => category.id === categoryId);
    if (!foundCategory) {
      return;
    }
    foundCategory.title = title;
    this.servers$.next(servers);
  }

  public deleteCategory(serverId: string, categoryId: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }

    const foundCategory: CategoryInterface | undefined = foundServer.categories.find(category => category.id === categoryId);
    if (!foundCategory) {
      return;
    }
    foundServer.categories.splice(foundServer.categories.indexOf(foundCategory), 1);
    this.servers$.next(servers);
  }

  public editChannel(name: string, serverId: string, categoryId: string, channelId: string, type: ChannelTypeEnum): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    const loggedUser: UserDataBaseInterface | null = this._authService.loggedUser$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);
    if (!foundServer) {
      return;
    }

    const foundCategory: CategoryInterface | undefined = foundServer.categories.find(category => category.id === categoryId);
    if (!foundCategory) {
      return;
    }

    const foundChannel: ChannelInterface | undefined = foundCategory.channels.find(channel => channel.id === channelId);
    if (!foundChannel) {
      return;
    }

    if (!loggedUser) {
      return;
    }
    this.resetJoinedUsers();
    if (type === ChannelTypeEnum.text) {
      loggedUser.textChannelId = foundChannel.id;
    } else {
      loggedUser.audioChannelId = foundChannel.id;
      foundChannel.messages = [];
    }

    foundChannel.title = name;
    foundChannel.type = type;

    this.currentChannel$.next(foundChannel);
    this.servers$.next(servers);
  }

  public deleteChannel(serverId: string, categoryId: string, channelId: string) {
    const servers: Array<ServerInterface> = this.servers$.value;
    const foundServer: ServerInterface | undefined = servers.find(server => server.id === serverId);

    if (!foundServer) {
      return;
    }

    const foundCategory: CategoryInterface | undefined = foundServer.categories.find(category => category.id === categoryId);
    if (!foundCategory) {
      return;
    }

    const foundChannel: ChannelInterface | undefined = foundCategory.channels.find(channel => channel.id === channelId);
    if (!foundChannel) {
      return;
    }
    foundChannel.title = '';
    foundCategory.channels.splice(foundCategory.channels.indexOf(foundChannel), 1);
    this.servers$.next(servers);
    this.currentChannel$.next(foundChannel);
  }

  public setCurrentServer(id: string): void {
    const servers: Array<ServerInterface> = this.servers$.value;

    const foundServer: ServerInterface | undefined = servers.find((server: ServerInterface) => server.id === id);

    if (foundServer) {
      servers.forEach((server: ServerInterface) => {
        server.isActive = server.id === id;
      });
      this.currentServer$.next({ ...foundServer });
      this.currentChannel$.next(ServerInitialization.defaultChannel());
      this.servers$.next(servers);
    }
  }

  public getServersFromLocalStorage(): void {
    const servers: string | null = localStorage.getItem(SERVER_LOCALSTORAGE_KEY);
    this.servers$.next(servers ? JSON.parse(servers) : []);
    this._store.dispatch(serversActions.setServersFromLocalStorage({ servers: servers ? JSON.parse(servers) : [] }));
  }

  public makeAllServerInactive(): void {
    const servers: Array<ServerInterface> = this.servers$.value;
    servers.forEach(server => (server.isActive = false));
    this.servers$.next(servers);
  }

  public listenToServersAndUpdateLocalStorage(): void {
    this._store.select(serversSelectors.selectServers).subscribe({
      next: (servers: Array<ServerInterface>) => {
        localStorage.setItem(SERVER_LOCALSTORAGE_KEY, JSON.stringify(servers));
      }
    });
  }
}
