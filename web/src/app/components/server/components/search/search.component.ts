import { Component, OnInit } from '@angular/core';
import { ServerInterface } from '../../../../interfaces/server.interface';
import { ServersService } from '../../../../services/servers.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {
  public servers!: Array<ServerInterface>;
  public inputServerName: string = '';
  public loggedUserServers!: Array<ServerInterface>;
  public serverFound!: boolean;

  constructor(private _serversService: ServersService) {}

  public ngOnInit(): void {
    this._serversService.servers$.subscribe({
      next: (servers: Array<ServerInterface>) => {
        this.servers = servers;
      }
    });

    this._serversService.loggedUserServers$.subscribe({
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
}
