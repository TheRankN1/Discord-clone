import { NgModule } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';
import { ServerDetailsComponent } from './components/server-details/server-details.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '../../directives/tooltip/tooltip.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from './components/avatar/avatar.component';
import { IconComponent } from './components/icon/icon.component';
import { IsNotEmptyPipe } from '../../pipes/is-not-empty.pipe';
import { AvatarInitialsPipe } from '../../pipes/avatar-initials.pipe';
import { ServerRoutesModule } from './server.routes';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { AlreadyJoinedPipe } from '../../pipes/Includes-server.pipe';
import { IncludesServerNamePipe } from '../../pipes/includes-server-name.pipe';
import { LoggedUserSettingsComponent } from './components/logged-user-settings/logged-user-settings.component';

const PIPES = [IsNotEmptyPipe, AvatarInitialsPipe, AlreadyJoinedPipe, IncludesServerNamePipe];
const COMPONENTS = [
  ChatComponent,
  ServerDetailsComponent,
  UsersListComponent,
  AvatarComponent,
  SideBarComponent,
  IconComponent,
  SearchComponent,
  LoggedUserSettingsComponent
];
const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, TooltipModule, HttpClientModule, RouterModule, ServerRoutesModule];

@NgModule({
  declarations: [PIPES, COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS]
})
export class ServerModule {}
