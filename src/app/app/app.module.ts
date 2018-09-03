import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

import { AppMaterialModule } from './app-material.module';

// import @delon/mock
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../../../_mock';


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

export const MOCKMODULE = !environment.production ? [DelonMockModule.forRoot({ data:MOCKDATA })] : [];

import * as fromContainers from './containers';

import { CommonsModule } from '../commons/commons.module';

// import the shared module
import { NavBarModule } from '../shared/navbar';


@NgModule({
  declarations: [
    ...fromContainers.containers
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    MOCKMODULE,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'routerReducer',
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    NavBarModule.forRoot(),
    CommonsModule.forRoot(),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer}
  ],
  bootstrap: [
    fromContainers.AppComponent
  ]
})
export class AppModule { }
