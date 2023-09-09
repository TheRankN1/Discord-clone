import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServersService } from '../../../../services/servers.service';
import { ChannelTypeEnum } from '../../../../enums/channel-type.enum';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat',
  styleUrls: ['chat.component.scss'],
  templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {
  public channelTextTitle!: string;
  private _destroy$: Subject<void> = new Subject();

  constructor(private _serversService: ServersService) {}

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
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
