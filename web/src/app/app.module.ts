import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ServerComponent } from './components/server/server.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { AppRoutes } from './app.routes';
import { IsNotEmptyPipe } from './pipes/is-not-empty.pipe';
import { TooltipModule } from './directives/tooltip/tooltip.module';
import { AvatarInitialsPipe } from './pipes/avatar-initials.pipe';
import { ModalGenericComponent } from './modals/modal-generic/modal-generic.component';
import { ChatComponent } from './components/chat/chat.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const COMPONENTS = [SideBarComponent, ServerComponent, AvatarComponent, AppComponent, ModalGenericComponent , ChatComponent , UsersListComponent];


const MODULES = [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, AppRoutes, TooltipModule];
const PIPES = [IsNotEmptyPipe, AvatarInitialsPipe];

@NgModule({
  declarations: [COMPONENTS, PIPES],
  imports: [MODULES],
  bootstrap: [AppComponent]
})
export class AppModule {}
