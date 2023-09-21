import { Component, OnInit } from '@angular/core';
import { ServerInterface } from '../../../../shared/interfaces/server.interface';
import { ServersService } from '../../../../shared/services/servers.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {
  public servers!: Array<ServerInterface>;
  public inputServerName: string = '';
  public loggedUserServers!: Array<ServerInterface>;
  public serverFound: boolean = false;
  public itemsPerPage: number = 2;
  public currentPage: number = 1;
  public totalPages: Array<number> = [];

  constructor(private _serversService: ServersService) {}

  public ngOnInit(): void {
    this._serversService.servers$.subscribe({
      next: (servers: Array<ServerInterface>) => {
        this.servers = [...servers];
      }
    });

    this._serversService.loggedUserServers$.subscribe({
      next: (servers: Array<ServerInterface>) => {
        this.loggedUserServers = [...servers];
      }
    });
    this.initializePages();
  }

  public joinServer(server: ServerInterface): void {
    this._serversService.joinServer(server);
  }

  public getTotalPages(): number {
    return Math.ceil(this.servers.length / this.itemsPerPage);
  }

  public getCurrentPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.servers.slice(startIndex, endIndex);
  }

  public getPageItems(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.servers.slice(startIndex, endIndex);
  }

  public checkClearPage(page: number): void {
    let clear = false;
    if (this.getPageItems(page).length === 0) {
      return;
    }
    this.getPageItems(page).forEach(server => {
      if (server.title.includes(this.inputServerName)) clear = true;
    });
    if (clear) {
      this.totalPages.splice(this.totalPages.indexOf(page) + 1, 1);
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

    for (let i = 1; i <= totalPages; i++) {
      this.totalPages.push(i);
    }
  }

  public onSearchInputChanged(): void {
    this.serverFound = false;
    this.servers.forEach(server => {
      if (server.title.includes(this.inputServerName)) {
        this.serverFound = true;
      }
    });
    this.totalPages.forEach(page => {
      this.checkClearPage(page);
    });
  }

  public trackByFn(index: number): number {
    return index;
  }

  public onSearchInputClear(): void {
    this.inputServerName = '';
    this.totalPages = [];
    this.initializePages();
    this.serverFound = true;
  }
}
