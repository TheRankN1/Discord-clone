import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServersService } from '../../services/servers.service';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
})
export class ModalCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('categoryInputRef') public categoryInputRef!: ElementRef<HTMLInputElement>;
  public isOpen$!: BehaviorSubject<boolean>;
  public category: string = '';
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _serversService: ServersService) {}

  public ngOnInit(): void {
    this.isOpen$ = this._serversService.isCategoryModalOpen$;
    this.isOpen$
      .pipe(
        filter((isOpen: boolean) => isOpen),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.categoryInputRef?.nativeElement?.focus();
          });
        }
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public closeModal(): void {
    this._serversService.isCategoryModalOpen$.next(false);
    this.category = '';
  }

  public addCategory(): void {
    this._serversService.addCategory(this.category, this._serversService.currentServer$.value?.id);
    this.closeModal();
  }
}
