import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServerInterface } from '../../../../interfaces/server.interface';
import { ServersService } from '../../../../services/servers.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {
  public servers$!: BehaviorSubject<Array<ServerInterface>>;
  public serverName: string = '';
  public loggedUserServers$!: BehaviorSubject<Array<ServerInterface>>;
  public includeTheServer : boolean = false;

  constructor(private _serversService: ServersService) {}

  public ngOnInit(): void {
    this.servers$ = this._serversService.servers$;
    this.loggedUserServers$ = this._serversService.loggedUserServers$;
  }

  public joinServer(server: ServerInterface) {
    this._serversService.joinServer(server);
  }
}
