import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: '../home/home.module#HomeModule',
  },
  {
    path: 'docs',
    loadChildren: '../docs/docs.module#DocsModule',
  },
  {
    path: 'guides',
    loadChildren: '../guides/guides.module#GuidesModule',
  },
  {
    path: 'notfound',
    loadChildren: '../notfound/notfound.module#NotfoundModule',
  },
  {
    path: '**', redirectTo: '/notfound'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
