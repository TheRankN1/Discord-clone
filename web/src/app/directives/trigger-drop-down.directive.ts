import {
  Directive,
  ElementRef, EmbeddedViewRef, EventEmitter, HostListener,
  Input,
  OnDestroy,
  ViewContainerRef
} from '@angular/core';

import {TemplatePortal} from '@angular/cdk/portal';
import {merge, Observable, Subscription} from 'rxjs';
import {DropdownPanel} from "../components/server/components/drop-down/dropdown-panel";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";

@Directive({
  selector: '[dropdownTrigger]',
})
export class TriggerDropDownDirective {
  private isDropdownOpen:boolean = false;
  private overlayRef!: OverlayRef;
  private dropdownClosingActionsSub = Subscription.EMPTY;

  @Input('dropdownTrigger') public dropdownPanel!: DropdownPanel;

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  @HostListener('click')
  public toggleDropdown(): void {
    this.isDropdownOpen ? this.destroyDropdown() : this.openDropdown();
  }

  public openDropdown(): void {
    this.isDropdownOpen = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
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

    const templatePortal: TemplatePortal = new TemplatePortal(
      this.dropdownPanel.templateRef,
      this.viewContainerRef
    );
    this.overlayRef.attach(templatePortal);

    this.dropdownClosingActionsSub = this.dropdownClosingActions().subscribe({
      next: () => this.destroyDropdown()
    });
  }

  private dropdownClosingActions(): Observable<MouseEvent | void> {
    const backdropClick$: Observable<MouseEvent> = this.overlayRef.backdropClick();
    const detachment$: Observable<void> = this.overlayRef.detachments();
    const dropdownClosed:EventEmitter<void> = this.dropdownPanel.closed;

    return merge(backdropClick$, detachment$, dropdownClosed);
  }

  private destroyDropdown(): void {
    if (!this.overlayRef || !this.isDropdownOpen) {
      return;
    }

    this.dropdownClosingActionsSub.unsubscribe();
    this.isDropdownOpen = false;
    this.overlayRef.detach();
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.dropdownClosingActionsSub.unsubscribe();
  }
}
