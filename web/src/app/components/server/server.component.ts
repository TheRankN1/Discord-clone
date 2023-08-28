import {Component, OnInit} from '@angular/core';
import {ServersService} from "../../services/servers.service";

@Component({
  selector: 'app-server',
  templateUrl: 'server.component.html',
  styleUrls: ['server.component.scss']
})
export class ServerComponent implements OnInit{
  public isOpen : boolean = false;

  constructor(private _serverService:ServersService) {
  }
  public ngOnInit():void{
    this._serverService.isLoggedSettingsModalOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    })
    }
}
