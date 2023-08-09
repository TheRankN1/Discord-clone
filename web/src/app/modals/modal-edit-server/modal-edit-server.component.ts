import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';
import { ServersService } from '../../services/servers.service';
import { Router } from '@angular/router';
import { ServerInterface } from '../../interfaces/server.interface';

@Component({
  selector: 'app-modal-edit-server',
  templateUrl: 'modal-edit-server.component.html',
})
export class ModalEditServerComponent {
  @ViewChild('editServerInputRef') public editServerInputRef!: ElementRef<HTMLInputElement>;
  public isOpen$!: BehaviorSubject<boolean>;
  public serverName: string = '';

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _serversService: ServersService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this.isOpen$ = this._serversService.isEditServerModalOpen$;
    this.isOpen$
      .pipe(
        filter((isOpen: boolean) => isOpen),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.editServerInputRef?.nativeElement?.focus();
          });
        }
      });
    this._serversService.currentServer$.subscribe(server => (this.serverName = server.title));
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public closeModal(): void {
    this._serversService.isEditServerModalOpen$.next(false);
  }

  public onEditServer(): void {
    const currentServer: ServerInterface = this._serversService.currentServer$.value;
    this._serversService.editServer(this.serverName, currentServer.id);
    this.closeModal();
  }

  public onDeleteServer(): void {
    const currentServer: ServerInterface = this._serversService.currentServer$.value;

    this._serversService.deleteServer(currentServer.id);
    this.closeModal();
  }
}
