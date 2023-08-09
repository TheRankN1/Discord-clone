import { Component, Input, OnInit } from '@angular/core';
import { ServerInterface } from '../../interfaces/server.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from '../../services/servers.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() public server!: ServerInterface;
  public avatarName: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _serversService: ServersService
  ) {}

  public ngOnInit(): void {
    this.avatarName = this._createAvatarInitials();
  }

  public setCurrentServer() {
    this._serversService.setCurrentServer(this.server.id);
  }

  private _createAvatarInitials(): string {
    if (!this.server) {
      return '';
    }
    const words: Array<string> = this.server.title.split(' ');
    const firstLetter: string = words[0].slice(0, 1);
    let secondLetter: string = '';
    if (words.length > 1) {
      secondLetter = words[words.length - 1].slice(0, 1);
    }
    return (firstLetter + secondLetter).toUpperCase();
  }
}
