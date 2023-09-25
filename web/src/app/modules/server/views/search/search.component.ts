import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ServerInterface } from '../../../../shared/interfaces/server.interface';
import { ServersService } from '../../../../shared/services/servers.service';
import { Store } from '@ngrx/store';
import { serversSelectors } from '../../../../store/servers';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public servers!: Array<ServerInterface>;
  public inputServerName: string = '';
  public loggedUserServers!: Array<ServerInterface>;
  public filteredServers!: Array<ServerInterface>;
  public serverFound: boolean = false;
  public itemsPerPage: number = 5;
  public currentPage: number = 1;
  public totalPages: Array<number> = [];
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _serversService: ServersService,
    private _store: Store
  ) {}

  public ngOnInit(): void {
    this._store
      .select(serversSelectors.selectServers)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (servers: Array<ServerInterface>) => {
          this.servers = [...servers];
          this.totalPages = [];
          this.initializePages();
        }
      });

    this._serversService.loggedUserServers$.subscribe({
      next: (servers: Array<ServerInterface>) => {
        this.loggedUserServers = [...servers];
      }
    });
    this.initializePages();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public joinServer(server: ServerInterface): void {
    this._serversService.joinServer(server);
  }

  public getTotalPages(): number {
    return Math.ceil(this.servers.length / this.itemsPerPage);
  }

  public getCurrentPageItems(servers: Array<ServerInterface>) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return servers.slice(startIndex, endIndex);
  }

  public getPageItems(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredServers.slice(startIndex, endIndex);
  }

  @HostListener('document:keydown', ['$event'])
  public clearOnBackspace(event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      this.onSearchInputClear();
    }
  }

  public increaseCurrentPage(): void {
    if (this.currentPage === this.totalPages.length) return;
    this.currentPage++;
  }

  public setCurrentPage(page: number): void {
    this.currentPage = page;
  }

  public decreaseCurrentPage(): void {
    if (this.currentPage === 1) return;
    this.currentPage--;
  }

  public initializePages(): void {
    const totalPages = this.getTotalPages();
    this.filteredServers = this.servers;
    for (let i = 1; i <= totalPages; i++) {
      this.totalPages.push(i);
    }
  }

  public onSearchInputChanged(): void {
    this.serverFound = false;
    this.filteredServers = [];
    this.servers.forEach(server => {
      if (server.title.includes(this.inputServerName)) {
        this.serverFound = true;
        this.filteredServers.push(server);
      }
    });
  }

  public trackByFn(index: number): number {
    return index;
  }

  public onSearchInputClear(): void {
    this.inputServerName = '';
    this.filteredServers = this.servers;
    this.totalPages = [];
    this.initializePages();
    this.serverFound = true;
  }
}
