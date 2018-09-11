import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsComponent } from './docs.components';

import { DocsRoutingModule } from './docs-routing.module';


@NgModule({
  declarations: [
    DocsComponent
  ],
  imports: [
    CommonModule,
    DocsRoutingModule
  ],
  exports: [],
  providers: [],
})
export class DocsModule {}
