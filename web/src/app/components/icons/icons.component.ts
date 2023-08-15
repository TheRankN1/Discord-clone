import {Component, OnInit} from "@angular/core";
import {projectIcons} from "../icon/project-icons";

@Component({
  selector:'app-icons',
  templateUrl:'icons.component.html',
  styleUrls:['icons.component.scss']
})
export class IconsComponent implements OnInit{
  public iconsSize :string = '';
  public color :string = '';
  public projectIcons !: Array<string>;

  public ngOnInit(): void{
    this.projectIcons = projectIcons;
  }
  public copyToClipboard(icon: string) {
    return `<discord-icon [name]="${icon}" class="big"></discord-icon>`
  }
}
