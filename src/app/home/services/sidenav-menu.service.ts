import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SidenavMenu } from '../models/sidenav-menu.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SidenavMenuService {

  constructor (
    private http: HttpClient
  ) {}

  public getSidenavMenuData () : Observable<SidenavMenu[]> {
    return this.http.get<SidenavMenu[]>('/api/sidenavmenu')
  }


}
