import { Directive, ElementRef, Input, OnInit } from '@angular/core';

type Position = 'top' | 'bottom' | 'left' | 'right'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tooltip]',
})
export class TooltipDirective implements OnInit {
  @Input() public tooltip: string = '';
  @Input() public position: Position = 'bottom';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.setAttribute('data-tooltip', this.tooltip);
    this.el.nativeElement.classList.add(`tooltip-${this.position}`);
  }
}
