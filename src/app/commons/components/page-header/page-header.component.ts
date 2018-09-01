import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
// import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  public currentPageRouter$: Observable<string>;
  public currentModuleRouter$: Observable<string>;

  constructor(
    private store: Store<fromStore.RootState>
  ) { }

  ngOnInit() {
    this.currentPageRouter$ = this.store.pipe(
      select(fromStore.getRouterPageLink)
    );
    this.currentModuleRouter$ = this.store.pipe(
      select( fromStore.getRouterModuleLink )
    );
  }
}
