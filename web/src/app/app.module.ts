import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModalGenericComponent } from './shared/modals/modal-generic/modal-generic.component';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from './modules/server/server.module';
import { CommonModule } from '@angular/common';
import { AppRoutes } from './app.routes';
import { ServerComponent } from './modules/server/server.component';
import { AuthModule } from './modules/auth/auth.module';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { effects, reducers, strictStateChecks } from './store';
import { metaReducers } from './store/meta-reducers';

const COMPONENTS = [AppComponent, ModalGenericComponent, ServerComponent];
const MODULES = [CommonModule, FormsModule, AuthModule, BrowserModule, ServerModule, AppRoutes];

const NGRX_MODULES = [
  EffectsModule.forRoot(effects),
  StoreModule.forRoot(reducers, {
    metaReducers,
    runtimeChecks: {
      strictStateImmutability: strictStateChecks,
      strictActionImmutability: strictStateChecks,
      strictStateSerializability: false,
      strictActionSerializability: false,
      strictActionWithinNgZone: strictStateChecks,
      strictActionTypeUniqueness: strictStateChecks
    }
  }),
  // StoreRouterConnectingModule.forRoot(),
  StoreDevtoolsModule.instrument({ maxAge: 100, logOnly: !strictStateChecks })
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES, NGRX_MODULES],
  bootstrap: [AppComponent]
})
export class AppModule {}
