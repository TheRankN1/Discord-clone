import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalGenericComponent } from './modals/modal-generic/modal-generic.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/login/login.component';
import { ServerModule } from './components/server/server.module';
import { CommonModule } from '@angular/common';
import { AppRoutes } from './app.routes';
import { ServerComponent } from './components/server/server.component';

const COMPONENTS = [AppComponent, ModalGenericComponent, RegisterComponent, LoginComponent, ServerComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, BrowserModule, ServerModule, AppRoutes],
  bootstrap: [AppComponent]
})
export class AppModule {}
