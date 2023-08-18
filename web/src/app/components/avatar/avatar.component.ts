import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() public isActive = false;
  @Input() public bgColor = '';
  @Input() public title = '';
  @Input() public status = '';
  @Input() public dimension = '';
  @Input() public squareOnHover = false;
  @Input() public bgImage: string | undefined = undefined;
  @Input() public server = false;
}
