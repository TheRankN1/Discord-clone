import { Component } from '@angular/core';
import { ServersService } from '../../../../services/servers.service';
import { ChannelTypeEnum } from '../../../../enums/channel-type.enum';

@Component({
  selector: 'app-chat',
  styleUrls: ['chat.component.scss'],
  templateUrl: 'chat.component.html'
})
export class ChatComponent {
  public channelTextTitle!: string;

  constructor(private _serversService: ServersService) {}

  ngOnInit() {
    this._serversService.currentChannel$.subscribe({
      next: channel => {
        if (channel.type === ChannelTypeEnum.text) {
          this.channelTextTitle = channel.title;
        }
      }
    });
  }
}
