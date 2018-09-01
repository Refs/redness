import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundRoutingModule } from './notfound-routing.module';


import * as fromContainers from './containers';


@NgModule({
  imports: [
    CommonModule,
    NotfoundRoutingModule
  ],
  declarations: [
    fromContainers.containers
  ]
})
export class NotfoundModule { }
