import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerComponent } from './components/server/server.component';
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' },
  { path: 'servers/:serverId', component: ServerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
