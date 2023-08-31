import {Component, EventEmitter, Output, TemplateRef, ViewChild} from "@angular/core";
import {DropdownPanel} from "./dropdown-panel";

@Component({
  selector:'app-drop-down',
  templateUrl:'drop-down.component.html',
  styleUrls:['drop-down.component.scss']
})
export class DropDownComponent implements DropdownPanel{
  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;
  @Output() closed = new EventEmitter<void>();

}
