import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';
import { ServersService } from '../../services/servers.service';
import { Router } from '@angular/router';
import { ServerInterface } from '../../interfaces/server.interface';
import { CategoryInterface } from '../../interfaces/category.interface';

@Component({
  selector: 'app-modal-edit-category',
  templateUrl: 'modal-edit-category.component.html',
  styleUrls: ['modal-edit-category.component.scss']
})
export class ModalEditCategoryComponent {
  @ViewChild('editCategoryInputRef') public editChannelInputRef!: ElementRef<HTMLInputElement>;
  public isOpen$!: BehaviorSubject<boolean>;
  public categoryName: string = '';

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _serversService: ServersService, private _router: Router) {}

  public ngOnInit(): void {
    this.isOpen$ = this._serversService.isEditCategoryModalOpen$;
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
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public closeModal(): void {
    this._serversService.isEditCategoryModalOpen$.next(false);
    this.categoryName = '';
  }

  public onEditCategory(): void {
    const currentServer: ServerInterface = this._serversService.currentServer$.value;
    const currentCategory: CategoryInterface = this._serversService.currentCategory$.value;

    this._serversService.editCategory(this.categoryName, currentServer.id, currentCategory.id);
    this.closeModal();
  }

  public onDeleteCategory(): void {
    const currentServer: ServerInterface = this._serversService.currentServer$.value;
    const currentCategory: CategoryInterface = this._serversService.currentCategory$.value;

    this._serversService.deleteCategory(currentServer.id, currentCategory.id);
    this.closeModal();
  }
}
