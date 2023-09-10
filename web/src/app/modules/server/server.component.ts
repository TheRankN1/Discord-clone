import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServersService } from '../../shared/services/servers.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: 'server.component.html',
  styleUrls: ['server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy {
  public isOpen: boolean = false;
  public destroy$: Subject<void> = new Subject<void>();
  public path: string = '';
  public displayChat: boolean = false;

  constructor(private _serverService: ServersService) {}

  public ngOnInit(): void {
    this._serverService.isLoggedSettingsModalOpen$.pipe(takeUntil(this.destroy$)).subscribe({
      next: isOpen => {
        this.isOpen = isOpen;
      }
    });
    this.path = window.location.pathname;
    if (this.path.includes('servers')) {
      this.displayChat = true;
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
