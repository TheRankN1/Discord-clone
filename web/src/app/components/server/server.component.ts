import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: 'server.component.html',
  styleUrls: ['server.component.scss']
})
export class ServerComponent implements OnInit {
  public path = '';
  public displayChat = false;

  public ngOnInit(): void {
    this.path = window.location.pathname;
    if (this.path.includes('servers')) {
      this.displayChat = true;
    }
  }
}
