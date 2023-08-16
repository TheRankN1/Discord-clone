import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {filter, Observable, Subject, takeUntil} from 'rxjs';
import {ModalService, ModalState} from '../../services/modal.service';

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html'
})
export class ModalGenericComponent implements OnInit, OnDestroy {
  @ViewChild('inputRef') public inputRef!: ElementRef<HTMLInputElement>;
  public isOpen$: Observable<boolean> = this._modalService.isOpen$;
  public state$: Observable<ModalState | undefined> = this._modalService.state$;
  public textInput: string | undefined = '';
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _modalService: ModalService) {
  }

  public ngOnInit(): void {
    this._isOpenListener();
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

  public save(state: ModalState): void {
    state.save(state.textInput);
    this._modalService.reset();
  }

  public delete(state: ModalState): void {
    state.delete();
    this._modalService.reset();
  }

  public create(state: ModalState): void {
    if (!state.create)
      return;
    state.create(state.textInput);
    this._modalService.reset();
  }
}
