import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServersService } from '../../services/servers.service';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal-server',
  templateUrl: './modal-server.component.html'
})
export class ModalServerComponent implements OnInit, OnDestroy {
  @ViewChild('serverInputRef') public serverInputRef!: ElementRef<HTMLInputElement>;
  public isOpen$!: BehaviorSubject<boolean>;
  public name: string = '';
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _serversService: ServersService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this.isOpen$ = this._serversService.isServerModalOpen$;
    this.isOpen$
      .pipe(
        filter((isOpen: boolean) => isOpen),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.serverInputRef?.nativeElement?.focus();
          });
        }
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public closeModal(): void {
    this._serversService.isServerModalOpen$.next(false);
  }

  public onAddServer(): void {
    this._serversService.addServer(this.name);
    this.closeModal();
  }
}
