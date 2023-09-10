import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { DropdownPanel } from './dropdown-panel';

@Component({
  selector: 'app-drop-down',
  templateUrl: 'drop-down.component.html',
  styleUrls: ['drop-down.component.scss']
})
export class DropDownComponent implements DropdownPanel {
  @ViewChild(TemplateRef) public templateRef!: TemplateRef<any>;
  @Output() public closed = new EventEmitter<void>();
}
