import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `{{ text }}`,
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TooltipComponent {
  @Input('tooltip') public text = '';
}
