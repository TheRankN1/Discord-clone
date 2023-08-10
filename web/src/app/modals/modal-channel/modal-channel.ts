import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';
import { ServersService } from '../../services/servers.service';
import { Router } from '@angular/router';
import { CategoryInterface } from '../../interfaces/category.interface';
import { ServerInterface } from '../../interfaces/server.interface';

@Component({
  selector: 'app-modal-channel',
  templateUrl: 'modal-channel.html'
})
export class ModalChannel implements OnInit, OnDestroy {
  @ViewChild('channelInputRef') public channelInputRef!: ElementRef<HTMLInputElement>;
  public isOpen$!: BehaviorSubject<boolean>;
  public channelName: string = '';

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _serversService: ServersService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this.isOpen$ = this._serversService.isChannelModalOpen$;
    this.isOpen$
      .pipe(
        filter((isOpen: boolean) => isOpen),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.channelInputRef?.nativeElement?.focus();
          });
        }
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public closeModal(): void {
    this._serversService.isChannelModalOpen$.next(false);
    this.channelName = '';
  }

  public onAddChannel(): void {
    const currentServer: ServerInterface = this._serversService.currentServer$.value;
    const currentCategory: CategoryInterface = this._serversService.currentCategory$.value;

    this._serversService.addChannel(this.channelName, currentServer.id, currentCategory.id);
    this.closeModal();
  }
}
