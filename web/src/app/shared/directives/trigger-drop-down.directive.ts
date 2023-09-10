import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter, merge, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { DropdownPanel } from '../components/drop-down/dropdown-panel';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ConnectedPosition } from '@angular/cdk/overlay/position/flexible-connected-position-strategy';
import { NavigationStart, Router } from '@angular/router';

type Position = 'top' | 'right' | 'bottom' | 'left' | 'initial';
const offset = 10;

/* TOOD: WIP */
const positions: { [key: string]: ConnectedPosition } = {
  top: { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetX: 0, offsetY: offset },
  right: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: offset * 2,
    offsetY: 0
  },
  bottom: { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetX: 0, offsetY: offset },
  left: { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: offset * 2, offsetY: 0 },
  initial: {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 8
  }
};

@Directive({
  selector: '[dropdownTrigger]'
})
export class TriggerDropDownDirective implements OnInit, OnDestroy {
  @Input('dropdownTrigger') public dropdownPanel!: DropdownPanel;
  @Output('isOpen') public isOpen = new EventEmitter<boolean>(false);
  @Input() public dropdownPosition: Position = 'initial';
  @Input() public customPosition!: ConnectedPosition;

  private _isDropdownOpen: boolean = false;
  private _overlayRef!: OverlayRef;
  private _dropdownClosingActionsSub = Subscription.EMPTY;
  private _destroy$ = new Subject<void>();

  constructor(
    private _overlay: Overlay,
    private _elementRef: ElementRef<HTMLElement>,
    private _viewContainerRef: ViewContainerRef,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this._routeListener();
  }

  public ngOnDestroy(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
    this._dropdownClosingActionsSub.unsubscribe();
    this._destroy$.next();
    this._destroy$.complete();
  }

  @HostListener('click')
  public toggleDropdown(): void {
    this._isDropdownOpen ? this._destroyDropdown() : this.openDropdown();
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
        .withPositions([this.customPosition ? this.customPosition : positions[this.dropdownPosition]])
    });

    const templatePortal: TemplatePortal = new TemplatePortal(this.dropdownPanel.templateRef, this._viewContainerRef);
    this._overlayRef.attach(templatePortal);

    this._dropdownClosingActionsSub = this._dropdownClosingActions().subscribe({
      next: () => this._destroyDropdown()
    });
  }

  private _dropdownClosingActions(): Observable<MouseEvent | void> {
    const backdropClick$: Observable<MouseEvent> = this._overlayRef.backdropClick();
    const detachment$: Observable<void> = this._overlayRef.detachments();
    const dropdownClosed: EventEmitter<void> = this.dropdownPanel.closed;

    return merge(backdropClick$, detachment$, dropdownClosed);
  }

  private _destroyDropdown(): void {
    if (!this._overlayRef || !this._isDropdownOpen) {
      return;
    }

    this._dropdownClosingActionsSub.unsubscribe();
    this._isDropdownOpen = false;
    this.isOpen.emit(false);
    this._overlayRef.detach();
  }

  private _routeListener(): void {
    this._router.events
      .pipe(
        filter((e): e is NavigationStart => e instanceof NavigationStart),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: () => this._destroyDropdown()
      });
  }
}
