import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() public isActive: boolean = false;
  @Input() public bgColor: string = '';
  @Input() public title: string = '';
  @Input() public status: string = '';
  @Input() public dimension: string = '';
  @Input() public squareOnHover: boolean = false;
  @Input() public bgImage: string | undefined = undefined;
  @Input() public server : boolean = false;
}
