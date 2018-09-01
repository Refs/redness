import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppMaterialModule } from './app-material.module';

// import storeModule
import { StoreModule, MetaReducer } from '@ngrx/store';
// import router store module
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
// import store devtools module
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// import appModule reducers
import { reducers, CustomSerializer, RootState } from './store';
// import ngx-store-freeze
import { storeFreeze } from 'ngrx-store-freeze';
// import angular-cli environments
import { environment } from '../../environments/environment';

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [storeFreeze] : [];


import * as fromContainers from './containers';


@NgModule({
  declarations: [
    ...fromContainers.containers
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'routerReducer',
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer}
  ],
  bootstrap: [
    fromContainers.AppComponent
  ]
})
export class AppModule { }
