import { NgModule } from '@angular/core';
import { ChatComponent } from '../../shared/components/chat/chat.component';
import { ServerDetailsComponent } from './components/server-details/server-details.component';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { IsNotEmptyPipe } from '../../shared/pipes/is-not-empty.pipe';
import { AvatarInitialsPipe } from '../../shared/pipes/avatar-initials.pipe';
import { ServerRoutesModule } from './server.routes';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './views/search/search.component';
import { AlreadyJoinedPipe } from '../../shared/pipes/Includes-server.pipe';
import { IncludesServerNamePipe } from '../../shared/pipes/includes-server-name.pipe';
import { LoggedUserSettingsComponent } from './components/logged-user-settings/logged-user-settings.component';
import { DropDownComponent } from '../../shared/components/drop-down/drop-down.component';
import { TriggerDropDownDirective } from '../../shared/directives/trigger-drop-down.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { TooltipModule } from '../../shared/components/tooltip/tooltip.module';
import { WhoSentMessagePipe } from '../../shared/pipes/who-sent-message.pipe';
import { StackMessagesPipe } from '../../shared/pipes/stack-messages.pipe';
import { CheckDifferentDaysPipe } from '../../shared/pipes/check-different-days.pipe';
import { UserRolesOfTheCurrentServerPipe } from './pipes/user-roles-of-the-current-server.pipe';

const PIPES = [
  IsNotEmptyPipe,
  AvatarInitialsPipe,
  AlreadyJoinedPipe,
  IncludesServerNamePipe,
  WhoSentMessagePipe,
  StackMessagesPipe,
  CheckDifferentDaysPipe,
  UserRolesOfTheCurrentServerPipe
];
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
  imports: [MODULES, TooltipModule],
  exports: [COMPONENTS]
})
export class ServerModule {}
