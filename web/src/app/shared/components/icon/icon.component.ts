import { Component, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';

const ICONS_PATH = 'assets/icons/svg';
const ICON_TYPE = '.svg';

@Component({
  selector: 'app-icon',
  template: '<div class="color-grey"></div>',
  styleUrls: ['icon.component.scss']
})
export class IconComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public name = '';
  @HostBinding('innerHTML') public svg!: SafeHtml;
  @HostBinding('class.color-grey') public isNotHovered = true;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  public ngOnInit(): void {
    this.http
      .get(`${ICONS_PATH}/${this.name}${ICON_TYPE}`, { responseType: 'text' })
      .pipe(takeUntil(this._destroy$))
      .subscribe(value => {
        this.svg = this.sanitizer.bypassSecurityTrustHtml(value);
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] && !changes['name'].firstChange) {
      this.http
        .get(`${ICONS_PATH}/${this.name}${ICON_TYPE}`, { responseType: 'text' })
        .pipe(takeUntil(this._destroy$))
        .subscribe(value => (this.svg = this.sanitizer.bypassSecurityTrustHtml(value)));
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
