import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';


const routes: Routes = [
  {
    path: '',
    component: fromContainers.HomeComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'dashBoard'},
      {},
      {},
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
