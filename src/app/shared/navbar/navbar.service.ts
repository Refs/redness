import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';



export interface Navmenu {
  title: string;
  link:  string;
  des:   string;
}



@Injectable()
export class NavbarService {
  constructor(private http: HttpClient) {}

  get(): Observable<Navmenu[]> {
    return this.http.get<Navmenu[]>('/api/navmenu').pipe(
      tap(data => console.log(data))
    )
  }
}
