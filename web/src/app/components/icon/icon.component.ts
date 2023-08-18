import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

const ICONS_PATH = 'assets/icons/svg';
const ICON_TYPE = '.svg';

@Component({
  selector: 'app-icon',
  template: '<div [class.color-grey]="isHovered"' + ' (mouseenter)="mouseenter()" (mouseleave)="mouseover()"></div>',
  styleUrls: ['icon.component.scss']
})
export class IconComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public name = '';
  @HostBinding('innerHTML') public svg!: SafeHtml;
  private subscription = new Subscription();
  @HostBinding('class.color-white') public isHovered = false;
  @HostBinding('class.color-grey') public isNotHovered = true;
  @HostListener('mouseenter')
  mouseenter() {
    this.isHovered = true;
    this.isNotHovered = false;
  }

  @HostListener('mouseleave')
  mouseover() {
    this.isHovered = false;
    this.isNotHovered = true;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  public ngOnInit(): void {
    this.subscription.add(
      this.http.get(`${ICONS_PATH}/${this.name}${ICON_TYPE}`, { responseType: 'text' }).subscribe(value => {
        this.svg = this.sanitizer.bypassSecurityTrustHtml(value);
      })
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] && !changes['name'].firstChange) {
      this.subscription.add(
        this.http
          .get(`${ICONS_PATH}/${this.name}${ICON_TYPE}`, { responseType: 'text' })
          .subscribe(value => (this.svg = this.sanitizer.bypassSecurityTrustHtml(value)))
      );
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
