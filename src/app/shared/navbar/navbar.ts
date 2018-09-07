import { MatButtonModule, MatMenuModule, MatToolbarModule, MatProgressBarModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgModule, Component, ModuleWithProviders, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Navmenu } from './nav.model';
import { Observable } from 'rxjs';
import { CommonsModule } from '../../commons/commons.module';
// import { ProcessBarService } from '../../commons/services/notifiers/process-bar.service';

@Component({
  selector: 'red-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  @Input()
  public navMenu: Navmenu[];
  // public progressBarShow$: Observable<any>;

  @Input()
  public userLogged: boolean;
  constructor(
    // private nav: NavbarService,
    // private processBarService: ProcessBarService
  ){
    // this.navMenu$ = this.nav.get()
  }

  ngOnInit() {
    // this.progressBarShow$ = this.processBarService.processShowCast$
  }
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatIconModule,
    CommonsModule.forChild()
  ],
  exports: [ NavbarComponent ],
  declarations: [ NavbarComponent ],
})
export class NavBarModule {
  static forRoot() :ModuleWithProviders {
    return {
      ngModule: NavBarModule,
      providers: [  ]
    }
  }
}



