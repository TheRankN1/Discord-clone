import { NgModule } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [TooltipDirective],
  declarations: [TooltipDirective]
})
export class TooltipModule {}
