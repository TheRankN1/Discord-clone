import { Component, OnInit } from '@angular/core';
import { ServersService } from './services/servers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _serverService: ServersService) {}
  public ngOnInit(): void {
    this._serverService.getServersFromLocalStorage();
    this._serverService.listenToServersAndUpdateLocalStorage();
  }
}
