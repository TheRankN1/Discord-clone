import { NgModule } from '@angular/core';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutesModule } from './auth.routes';

const COMPONENTS = [LoginComponent, RegisterComponent];
const MODULES = [CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, AuthRoutesModule];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS]
})
export class AuthModule {}
