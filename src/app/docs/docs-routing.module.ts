import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.components';

import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', component: DocsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
})
export class DocsRoutingModule {}
