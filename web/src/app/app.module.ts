import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ServerDetailsComponent } from './components/server-details/server-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { AppRoutes } from './app.routes';
import { IsNotEmptyPipe } from './pipes/is-not-empty.pipe';
import { TooltipModule } from './directives/tooltip/tooltip.module';
import { AvatarInitialsPipe } from './pipes/avatar-initials.pipe';
import { IconComponent } from './components/icon/icon.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalGenericComponent } from './modals/modal-generic/modal-generic.component';
import { ChatComponent } from './components/chat/chat.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ServerComponent} from "./components/server/server.component";

const COMPONENTS = [
  SideBarComponent,
  ServerDetailsComponent,
  AvatarComponent,
  AppComponent,
  IconComponent,
  ModalGenericComponent,
  ChatComponent,
  UsersListComponent,
  LoginComponent,
  RegisterComponent,
  ServerComponent
];

const MODULES = [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, AppRoutes, TooltipModule, HttpClientModule];
const PIPES = [IsNotEmptyPipe, AvatarInitialsPipe];

@NgModule({
  declarations: [COMPONENTS, PIPES],
  imports: [MODULES],
  bootstrap: [AppComponent]
})
export class AppModule {}
