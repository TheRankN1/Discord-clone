import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';
import { ServersService } from '../../services/servers.service';
import { Router } from '@angular/router';
import { ServerInterface } from '../../interfaces/server.interface';
import { CategoryInterface } from '../../interfaces/category.interface';
import { ChannelInterface } from '../../interfaces/channel.interface';

@Component({
  selector: 'app-modal-edit-channel',
  templateUrl: 'modal-edit-channel.component.html',
})
export class ModalEditChannelComponent {
  @ViewChild('editChannelInputRef') public editChannelInputRef!: ElementRef<HTMLInputElement>;
  public isOpen$!: BehaviorSubject<boolean>;
  public channelName: string = '';

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _serversService: ServersService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this.isOpen$ = this._serversService.isEditChannelModalOpen$;
    this.isOpen$
      .pipe(
        filter((isOpen: boolean) => isOpen),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.editChannelInputRef?.nativeElement?.focus();
          });
        }
      });
    this._serversService.currentChannel$.subscribe(channel => (this.channelName = channel.title));
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public closeModal(): void {
    this._serversService.isEditChannelModalOpen$.next(false);
  }

  public onEditChannel(): void {
    const currentServer: ServerInterface = this._serversService.currentServer$.value;
    const currentCategory: CategoryInterface = this._serversService.currentCategory$.value;
    const currentChannel: ChannelInterface = this._serversService.currentChannel$.value;

    this._serversService.editChannel(this.channelName, currentServer.id, currentCategory.id, currentChannel.id);
    this.closeModal();
  }

  public onDeleteChannel(): void {
    const currentServer: ServerInterface = this._serversService.currentServer$.value;
    const currentCategory: CategoryInterface = this._serversService.currentCategory$.value;
    const currentChannel: ChannelInterface = this._serversService.currentChannel$.value;

    this._serversService.deleteChannel(currentServer.id, currentCategory.id, currentChannel.id);
    this.closeModal();
  }
}
