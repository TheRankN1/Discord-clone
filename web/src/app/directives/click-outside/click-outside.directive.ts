import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Input() appOutsideClick: boolean = false;

  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: any): void {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    this.appOutsideClick = !clickedInside;
  }
}
