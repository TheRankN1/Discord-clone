import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [TooltipComponent, TooltipDirective],
  imports: [OverlayModule],
  exports: [TooltipComponent, TooltipDirective]
})
export class TooltipModule {}
