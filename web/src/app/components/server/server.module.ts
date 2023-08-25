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

const PIPES = [IsNotEmptyPipe, AvatarInitialsPipe];
const COMPONENTS = [ChatComponent, ServerDetailsComponent, UsersListComponent, AvatarComponent, SideBarComponent, IconComponent];
const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, TooltipModule, HttpClientModule, RouterModule, ServerRoutesModule];

@NgModule({
  declarations: [PIPES, COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS]
})
export class ServerModule {}
