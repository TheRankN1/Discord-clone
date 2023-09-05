import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { merge, Observable, Subscription } from 'rxjs';
import { DropdownPanel } from '../components/server/components/drop-down/dropdown-panel';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

@Directive({
  selector: '[dropdownTrigger]'
})
export class TriggerDropDownDirective {
  private _isDropdownOpen: boolean = false;
  private _overlayRef!: OverlayRef;
  private _dropdownClosingActionsSub = Subscription.EMPTY;

  @Input('dropdownTrigger') public dropdownPanel!: DropdownPanel;
  @Output('isOpen') public isOpen = new EventEmitter<boolean>(false);

  constructor(
    private _overlay: Overlay,
    private _elementRef: ElementRef<HTMLElement>,
    private _viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('click')
  public toggleDropdown(): void {
    this._isDropdownOpen ? this.destroyDropdown() : this.openDropdown();
  }

  public openDropdown(): void {
    this._isDropdownOpen = true;
    this.isOpen.emit(true);
    this._overlayRef = this._overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this._overlay.scrollStrategies.close(),
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._elementRef)
        .withPositions([
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 8
          }
        ])
    });

    const templatePortal: TemplatePortal = new TemplatePortal(this.dropdownPanel.templateRef, this._viewContainerRef);
    this._overlayRef.attach(templatePortal);

    this._dropdownClosingActionsSub = this.dropdownClosingActions().subscribe({
      next: () => this.destroyDropdown()
    });
  }

  private dropdownClosingActions(): Observable<MouseEvent | void> {
    const backdropClick$: Observable<MouseEvent> = this._overlayRef.backdropClick();
    const detachment$: Observable<void> = this._overlayRef.detachments();
    const dropdownClosed: EventEmitter<void> = this.dropdownPanel.closed;

    return merge(backdropClick$, detachment$, dropdownClosed);
  }

  private destroyDropdown(): void {
    if (!this._overlayRef || !this._isDropdownOpen) {
      return;
    }

    this._dropdownClosingActionsSub.unsubscribe();
    this._isDropdownOpen = false;
    this.isOpen.emit(false);
    this._overlayRef.detach();
  }

  ngOnDestroy(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
    this._dropdownClosingActionsSub.unsubscribe();
  }
}
