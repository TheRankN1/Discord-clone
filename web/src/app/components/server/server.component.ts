import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ServerInterface } from '../../interfaces/server.interface';
import { ServersService } from '../../services/servers.service';
import { CategoryInterface } from '../../interfaces/category.interface';
import { ChannelInterface } from '../../interfaces/channel.interface';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy {
  public currentServer!: ServerInterface;
  public servers!: Array<ServerInterface>;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _route: ActivatedRoute, private _router: Router, private _serversService: ServersService) {}

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
        this._serversService.currentServer$.subscribe(server => this.currentServer = server)
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

  public openCategoryModal(): void {
    this._serversService.isCategoryModalOpen$.next(true);
  }

  public openChannelModal(category: CategoryInterface): void {
    this._serversService.currentCategory$.next(category);
    this._serversService.isChannelModalOpen$.next(true);
  }

  public openEditChannelModal(category: CategoryInterface, channel: ChannelInterface): void {
    this._serversService.currentCategory$.next(category);
    this._serversService.currentChannel$.next(channel);
    this._serversService.isEditChannelModalOpen$.next(true);
  }

  public openEditCategoryModal(category: CategoryInterface): void {
    this._serversService.isEditCategoryModalOpen$.next(true);
    this._serversService.currentCategory$.next(category);
  }

  public openEditServerModal(server: ServerInterface): void {
    this._serversService.isEditServerModalOpen$.next(true);
    this.currentServer = this._serversService.currentServer$.value;
  }
}
