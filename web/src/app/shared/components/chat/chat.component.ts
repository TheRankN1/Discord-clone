import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ServersService } from '../../services/servers.service';
import { ChannelTypeEnum } from '../../enums/channel-type.enum';
import { Subject, takeUntil } from 'rxjs';
import { ChatMessage } from '../../interfaces/chat.interface';
import { UserDataBaseInterface } from '../../interfaces/user-data-base.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  styleUrls: ['chat.component.scss'],
  templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {
  public channelTextTitle!: string;
  public message: string = '';
  public messages: Array<ChatMessage> = [];
  public userWhoSentTheMessage!: UserDataBaseInterface;
  public users: Array<UserDataBaseInterface> = [];
  private _destroy$: Subject<void> = new Subject();

  constructor(
    private _serversService: ServersService,
    private _authService: AuthService
  ) {}

  public ngOnInit(): void {
    this._serversService.currentChannel$.pipe(takeUntil(this._destroy$)).subscribe({
      next: channel => {
        if (channel.type === ChannelTypeEnum.text && channel) {
          this.channelTextTitle = channel.title;
        } else {
          this.channelTextTitle = '';
        }
      }
    });

    this._serversService.currentChannel$.pipe(takeUntil(this._destroy$)).subscribe({
      next: currentChannel => {
        if (currentChannel.messages) this.messages = [...currentChannel.messages];
      }
    });

    this._authService.users$.pipe(takeUntil(this._destroy$)).subscribe({
      next: users => {
        this.users = [...users];
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  public setTheValueOnEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (this.message != '') {
        this._serversService.addMessage(this.message);
      }
      this.message = '';
      return;
    }
  }

  public trackByFn(index: number): number {
    return index;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
