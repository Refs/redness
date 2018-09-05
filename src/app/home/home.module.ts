import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
// import { HomeMaterialModule } from './home-material.module';
import { AppMaterialModule } from '../app-material.module';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';




import * as fromContainers from './containers';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
    PerfectScrollbarModule
  ],
  declarations: [
    fromContainers.containers
  ]
})
export class HomeModule { }
