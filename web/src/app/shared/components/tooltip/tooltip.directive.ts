import { ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ConnectedPosition } from '@angular/cdk/overlay/position/flexible-connected-position-strategy';
import { TooltipComponent } from './tooltip.component';
import { NavigationStart, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

type Position = 'top' | 'right' | 'bottom' | 'left';
const offset = 5;

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input('tooltip') public text = '';
  @Input() public tooltipPosition: Position = 'top';
  private _overlayRef!: OverlayRef;
  private _destroy$ = new Subject<void>();

  constructor(
    private _overlay: Overlay,
    private _overlayPositionBuilder: OverlayPositionBuilder,
    private _elementRef: ElementRef,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this._setTooltipPosition();
    this._routeListener();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  @HostListener('mouseenter')
  private _show(): void {
    const tooltipPortal: ComponentPortal<TooltipComponent> = new ComponentPortal(TooltipComponent);
    const tooltipRef: ComponentRef<TooltipComponent> = this._overlayRef.attach(tooltipPortal);
    tooltipRef.instance.text = this.text;
  }

  @HostListener('mouseout')
  private _hide(): void {
    this._overlayRef.detach();
  }

  private _routeListener(): void {
    this._router.events
      .pipe(
        filter((e): e is NavigationStart => e instanceof NavigationStart),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: () => this._hide()
      });
  }

  private _setTooltipPosition(): void {
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
      left: { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: offset * 2, offsetY: 0 }
    };

    const positionStrategy = this._overlayPositionBuilder
      .flexibleConnectedTo(this._elementRef)
      .withPositions([positions[this.tooltipPosition]]);
    this._overlayRef = this._overlay.create({ positionStrategy });
  }
}
