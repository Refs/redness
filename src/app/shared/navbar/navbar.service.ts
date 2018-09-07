import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Navmenu } from './nav.model';




@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  constructor(private http: HttpClient) {}

  get(): Observable<Navmenu[]> {
    return this.http.get<Navmenu[]>('/api/navmenu').pipe(
      tap(data => console.log(data))
    )
  }
}
