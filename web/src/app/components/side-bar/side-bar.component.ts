import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../services/servers.service';
import { ServerInterface } from '../../interfaces/server.interface';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  public servers$!: BehaviorSubject<Array<ServerInterface>>;

  constructor(
    private _serversService: ServersService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this.servers$ = this._serversService.servers$;
  }

  public openModalServer(): void {
    this._serversService.isServerModalOpen$.next(true);
  }

  public onServerDetails(id: string) {
    this._serversService.isCategoryModalOpen$.next(false);
    this._router.navigate(['/servers', id]).then();
  }
}
