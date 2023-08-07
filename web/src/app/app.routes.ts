import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerComponent } from './components/server/server.component';

const routes: Routes = [
  { path: '', component: ServerComponent, pathMatch: 'full' },
  { path: 'servers/:serverId', component: ServerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
