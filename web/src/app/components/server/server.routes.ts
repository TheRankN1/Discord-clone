import { RouterModule, Routes } from '@angular/router';
import { ServerDetailsComponent } from './components/server-details/server-details.component';
import { NgModule } from '@angular/core';
import { ServerComponent } from './server.component';

const routes: Routes = [
  {
    path: '',
    component: ServerComponent,
    children: [
      {
        path: 'details/:serverId',
        component: ServerDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerRoutesModule {}
