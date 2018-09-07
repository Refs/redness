import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';




import * as fromAuthStore  from './store';
import * as fromComponents from './components';
import * as fromContainers from './containers';



@NgModule({
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AppMaterialModule,
    StoreModule.forFeature('auth', fromAuthStore.reducers),
    EffectsModule.forFeature([
      ...fromAuthStore.effects
    ]),
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  exports: [
    ...fromContainers.containers,
    ...fromComponents.components,
  ],
  providers: [],
  entryComponents: [
    fromComponents.LogoutConfirmationDialogComponent
  ]
})
export class AuthModule {}
