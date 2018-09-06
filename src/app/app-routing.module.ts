import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'docs',
    loadChildren: './docs/docs.module#DocsModule',
  },
  {
    path: 'guides',
    loadChildren: './guides/guides.module#GuidesModule',
  },
  {
    path: 'notfound',
    loadChildren: './notfound/notfound.module#NotfoundModule',
  },
  // when we set the route like this , we have to set all the module who have pages as lazyloading module, or we won't get the module's page
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
