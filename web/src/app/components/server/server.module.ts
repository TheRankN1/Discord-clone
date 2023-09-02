import { NgModule } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';
import { ServerDetailsComponent } from './components/server-details/server-details.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { TriggerDropDownDirective } from '../../directives/trigger-drop-down.directive';
import { OverlayModule } from '@angular/cdk/overlay';

const PIPES = [IsNotEmptyPipe, AvatarInitialsPipe, AlreadyJoinedPipe, IncludesServerNamePipe];
const COMPONENTS = [
  ChatComponent,
  ServerDetailsComponent,
  UsersListComponent,
  AvatarComponent,
  SideBarComponent,
  IconComponent,
  SearchComponent,
  LoggedUserSettingsComponent,
  DropDownComponent,
  TriggerDropDownDirective
];
const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, ServerRoutesModule, OverlayModule];

@NgModule({
  declarations: [PIPES, COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS]
})
export class ServerModule {}
