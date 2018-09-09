import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';

import * as fromRootStore from './store';
import * as fromAuthStore from './auth/store';
import { Store, select } from '@ngrx/store';


import * as fromCommonsServices from './commons/services';
import { Observable } from 'rxjs';

import { Navmenu, NavbarService } from './shared/navbar';






@Component({
  selector: 'app-root',
  template: `
      <red-navbar [navMenu] = 'navMenu$ | async' [userLogged] = 'userLogged$ | async' >
        <button class="toggle-button" style="color: white" mat-icon-button>
           <mat-icon>menu</mat-icon>
        </button>
        <mat-progress-bar *ngIf="progressBarShow$ | async"  mode="indeterminate"></mat-progress-bar>
        <img class="logo" src="../assets/img/homepage/angular-white-transparent.svg">

        <app-control-panel-picker [username]= "username" *ngIf ="userLogged$ | async">
            <div class="panel-arrow"></div>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>个人中心
            </button>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>设置
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>settings</mat-icon>退出登录
            </button>
        </app-control-panel-picker>
      </red-navbar>
      <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit{

  public navMenu$ : Observable<Navmenu[]>;

  public userLogged$: Observable<boolean>;

  public progressBarShow$: Observable<boolean>;
  public username: string = '大哥';

  constructor(
    private progressBarService: fromCommonsServices.ProcessBarService,
    private navbarService: NavbarService,
    private store: Store<fromRootStore.State>
  ) {}


  ngOnInit(){
    // this.progressBarService.processShow = true;
    this.progressBarShow$ = this.progressBarService.processShowCast$;
    this.progressBarService.processShow = true;
    this.navMenu$ = this.navbarService.get();
    this.userLogged$ = this.store.pipe(
      select(fromAuthStore.getLoggedIn)
    )
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.progressBarService.processShow = false;
    }, 1000)
  }

  public logout () {
    // console.log('我被点了')
    this.store.dispatch(new fromAuthStore.AuthActions.LogoutConfirmation())
  }


}
