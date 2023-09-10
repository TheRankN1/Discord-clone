import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ConnectedPosition } from '@angular/cdk/overlay/position/flexible-connected-position-strategy';
import { TooltipComponent } from './tooltip.component';

type Position = 'top' | 'right' | 'bottom' | 'left';
const offset = 5;

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit {
  @Input('tooltip') public text = '';
  @Input() public tooltipPosition: Position = 'top';
  private _overlayRef!: OverlayRef;

  constructor(
    private _overlay: Overlay,
    private _overlayPositionBuilder: OverlayPositionBuilder,
    private _elementRef: ElementRef
  ) {}

  public ngOnInit(): void {
    this._setTooltipPosition();
  }

  @HostListener('mouseenter')
  public show(): void {
    console.log({ show: this.text });
    const tooltipPortal: ComponentPortal<TooltipComponent> = new ComponentPortal(TooltipComponent);
    const tooltipRef: ComponentRef<TooltipComponent> = this._overlayRef.attach(tooltipPortal);
    tooltipRef.instance.text = this.text;
  }

  @HostListener('mouseout')
  public hide(): void {
    console.log({ hide: this.text });
    this._overlayRef.detach();
  }

  private _setTooltipPosition(): void {
    const positions: { [key: string]: ConnectedPosition } = {
      top: { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetX: 0, offsetY: offset },
      right: { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offset * 2, offsetY: 0 },
      bottom: { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetX: 0, offsetY: offset },
      left: { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: offset * 2, offsetY: 0 }
    };

    const positionStrategy = this._overlayPositionBuilder
      .flexibleConnectedTo(this._elementRef)
      .withPositions([positions[this.tooltipPosition]]);
    this._overlayRef = this._overlay.create({ positionStrategy });
  }
}
