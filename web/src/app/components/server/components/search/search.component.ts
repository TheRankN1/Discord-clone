import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerInterface} from '../../../../interfaces/server.interface';
import {ServersService} from '../../../../services/servers.service';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public servers!: Array<ServerInterface>;
  public inputServerName: string = '';
  public loggedUserServers!: Array<ServerInterface>;
  public serverFound!: boolean;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _serversService: ServersService) {
  }

  public ngOnInit(): void {
    this._serversService.servers$.pipe(takeUntil(this._destroy$)).subscribe({
      next: (servers: Array<ServerInterface>) => {
        this.servers = [...servers];
      }
    });

    this._serversService.loggedUserServers$.pipe(takeUntil(this._destroy$)).subscribe({
      next: (servers: Array<ServerInterface>) => {
        this.loggedUserServers = [...servers];
      }
    });
  }

  public joinServer(server: ServerInterface): void {
    this._serversService.joinServer(server);
  }

  public onSearchInputChanged(): void {
    this.serverFound = false;
    this.servers.forEach(server => {
      if (server.title.includes(this.inputServerName)) {
        this.serverFound = true;
      }
    });
  }

  public trackByFn(index: number): number {
    return index;
  }

  public onSearchInputClear(): void {
    this.inputServerName = '';
    this.serverFound = true;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
