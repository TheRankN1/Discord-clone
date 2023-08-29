import { RouterModule, Routes } from '@angular/router';
import { ServerDetailsComponent } from './components/server-details/server-details.component';
import { NgModule } from '@angular/core';
import { ServerComponent } from './server.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: ServerComponent,
    children: [
      {
        path: '',
        component: ServerDetailsComponent
      },
      {
        path: 'details/:serverId',
        component: ServerDetailsComponent
      },
      {
        path: 'search',
        component: SearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerRoutesModule {}
