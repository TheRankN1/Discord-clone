import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServersService } from '../../services/servers.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: 'server.component.html',
  styleUrls: ['server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy {
  public isOpen: boolean = false;
  public destroy$: Subject<void> = new Subject<void>();

  constructor(private _serverService: ServersService) {}

  public ngOnInit(): void {
    this._serverService.isLoggedSettingsModalOpen$.pipe(takeUntil(this.destroy$)).subscribe({
      next: isOpen => {
        this.isOpen = isOpen;
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
