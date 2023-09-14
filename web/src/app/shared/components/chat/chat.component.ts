import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServersService } from '../../services/servers.service';
import { ChannelTypeEnum } from '../../enums/channel-type.enum';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ChatMessage } from '../../interfaces/chat.interface';
import { UserDataBaseInterface } from '../../interfaces/user-data-base.interface';
import { AuthService } from '../../services/auth.service';
import { CategoryInterface } from '../../interfaces/category.interface';
import { ChannelInterface } from '../../interfaces/channel.interface';
import { ModalService } from '../../services/modal.service';
import { ServerInterface } from '../../interfaces/server.interface';

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
  public currentServer!: ServerInterface;
  public currentCategory!: CategoryInterface;
  public currentChannel!: ChannelInterface;
  private _destroy$: Subject<void> = new Subject();

  @ViewChild('allMessages') public allMessages!: ElementRef;

  constructor(
    private _serversService: ServersService,
    private _authService: AuthService,
    private _modalService: ModalService
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

    this._authService.users$.pipe(takeUntil(this._destroy$)).subscribe({
      next: users => {
        this.users = [...users];
      }
    });
    combineLatest([this._serversService.currentServer$, this._serversService.currentCategory$, this._serversService.currentChannel$])
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: ([server, category, channel]) => {
          this.currentServer = server;
          this.currentCategory = category;
          this.currentChannel = channel;
        }
      });

    this._serversService.currentChannel$.pipe(takeUntil(this._destroy$)).subscribe({
      next: currentChannel => {
        if (currentChannel.messages) this.messages = [...currentChannel.messages];
      }
    });
  }

  public openEditChannelModal(): void {
    this._modalService.openModal({
      onEditMode: true,
      title: 'Edit channel',
      textInput: this.currentChannel.title.trim(),
      type: 'channel',
      placeholder: 'Enter channel name',
      delete: this.onDeleteChannelModal.bind(this),
      save: this.onEditChannelModal.bind(this),
      create: this.onCreateChannelModal.bind(this),
      data: {
        channelType: this.currentChannel.type
      }
    });
  }

  public onCreateChannelModal(channelTitle: string, type: ChannelTypeEnum): void {
    this._serversService.addChannel(channelTitle, this.currentServer.id, this.currentCategory.id, type);
  }

  public onEditChannelModal(channelTitle: string, type: ChannelTypeEnum): void {
    this._serversService.editChannel(channelTitle, this.currentServer.id, this.currentCategory.id, this.currentChannel.id, type);
  }

  public onDeleteChannelModal(): void {
    this._serversService.deleteChannel(this.currentServer.id, this.currentCategory.id, this.currentChannel.id);
  }

  public setTheValueOnEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (this.message != '') {
        this._serversService.addMessage(this.message);
      }
      this.message = '';
      const messages: HTMLDivElement = this.allMessages.nativeElement;

      messages.scrollTop = messages.scrollHeight;
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
