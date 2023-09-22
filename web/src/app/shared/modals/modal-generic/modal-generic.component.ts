import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ModalService, ModalState } from '../../services/modal.service';
import { ChannelTypeEnum } from '../../enums/channel-type.enum';

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html'
})
export class ModalGenericComponent implements OnInit, OnDestroy {
  @ViewChild('inputRef') public inputRef!: ElementRef<HTMLInputElement>;
  public isOpen$: Observable<boolean> = this._modalService.isOpen$;
  public state$: Observable<ModalState | undefined> = this._modalService.state$;
  public selectedChannelType = ChannelTypeEnum.text;
  public colorPicked: string = '';
  public state: ModalState | undefined;
  public colors: Array<string> = [
    'rgb(0, 255, 191)',
    'rgb(0, 255, 128)',
    'rgb(0, 128, 255)',
    'rgb(128, 0, 255)',
    'rgb(255, 0, 128)',
    'rgb(255, 255, 0)',
    'rgb(255, 128, 0)',
    'rgb(255, 64, 0)',
    'rgb(134, 121, 121)',
    'rgb(128, 128, 128)'
  ];

  public colorsWithSmallOpacity: Array<string> = [
    'rgb(0, 255, 191, 0.5)',
    'rgb(0, 255, 128, 0.5)',
    'rgb(0, 128, 255, 0.5)',
    'rgb(128, 0, 255, 0.5)',
    'rgb(255, 0, 128, 0.5)',
    'rgb(255, 255, 0, 0.5)',
    'rgb(255, 128, 0, 0.5)',
    'rgb(255, 64, 0, 0.5)',
    'rgb(134, 121, 121, 0.5)',
    'rgb(128, 128, 128, 0.5)'
  ];

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _modalService: ModalService) {}

  public ngOnInit(): void {
    this._isOpenListener();
    this.state$.pipe(takeUntil(this._destroy$)).subscribe({
      next: state => {
        this.selectedChannelType = state?.data?.channelType || ChannelTypeEnum.text;
        this.state = state;
      }
    });
  }

  public pickTheColor(color: string) {
    this.colorPicked = color;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _isOpenListener(): void {
    this.isOpen$
      .pipe(
        filter((isOpen: boolean) => isOpen),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.inputRef?.nativeElement?.focus();
          });
        }
      });
  }

  public close(): void {
    this._modalService.reset();
  }

  public save(state?: ModalState): void {
    if (state) {
      state.save ? state.save(state.textInput, this.selectedChannelType) : undefined;
      this._modalService.reset();
    }
  }

  public delete(state: ModalState): void {
    state.delete ? state.delete() : undefined;
    this._modalService.reset();
  }

  public create(state?: ModalState): void {
    if (state) {
      if (!state.create) return;
      state.create(state.textInput, this.selectedChannelType, this.colorPicked);
      this._modalService.reset();
    }
  }

  @HostListener('document:keydown', ['$event'])
  public setTheValueOnEnter(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }

    if (event.key === 'Enter') {
      if (this.state?.textInput.trim().length === 0) {
        this.close();
      } else if (this.state) {
        if (!this.state.onEditMode) {
          this.create(this.state);
        } else {
          this.save(this.state);
        }
      }
    }
  }

  public onTextInputChanged(event: KeyboardEvent): void {
    if (event.key === ' ' && this.state) {
      if (this.state.textInput) {
        this.state.textInput = this.state.textInput.trim();
      }
    }
  }
}
