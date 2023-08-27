import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModalGenericComponent } from './modals/modal-generic/modal-generic.component';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from './components/server/server.module';
import { CommonModule } from '@angular/common';
import { AppRoutes } from './app.routes';
import { ServerComponent } from './components/server/server.component';
import { AuthModule } from './components/auth/auth.module';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [AppComponent, ModalGenericComponent, ServerComponent];
const MODULES = [CommonModule, FormsModule, AuthModule, BrowserModule, ServerModule, AppRoutes];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  bootstrap: [AppComponent]
})
export class AppModule {}
