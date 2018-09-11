import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { SidenavMenuService } from '../../services/sidenav-menu.service';
import { SidenavMenu } from '../../models/sidenav-menu.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  public sideNavMenuDate$: Observable<SidenavMenu[]>;
  public currentModuleRouter$: Observable<any>;

  constructor(
    private sidenavMenuService: SidenavMenuService,
  ) { }

  ngOnInit() {
    this.sideNavMenuDate$ = this.sidenavMenuService.getSidenavMenuData()
  }

}
