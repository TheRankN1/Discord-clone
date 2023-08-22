import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/components/register/register.component';
import { LoginComponent } from './components/auth/components/login/login.component';
import { ServerDetailsComponent } from './components/server/components/server-details/server-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'servers',
    loadChildren: () => import('./components/server/server.module').then(m => m.ServerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
