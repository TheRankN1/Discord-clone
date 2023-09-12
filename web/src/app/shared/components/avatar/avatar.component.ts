import { Component, Input } from '@angular/core';
import { HoverType } from '../../types/hover.type';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() public isActive = false;
  @Input() public bgColor: string | undefined = '';
  @Input() public title = '';
  @Input() public status = '';
  @Input() public dimension = '';
  @Input() public iconDimension = '';
  @Input() public hover!: HoverType;
  @Input() public bgImage: string | undefined = undefined;
  @Input() public server = false;
  @Input() public icon = '';
  @Input() public fillHoverColor = '';
  @Input() public hideTooltip = false;
}
