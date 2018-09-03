import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as fromCommonsServices from '../../../commons/services';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  public progressBarShow$: Observable<boolean>;

  constructor(
    private progressBarService: fromCommonsServices.ProcessBarService,
  ) {}


  ngOnInit(){
    this.progressBarService.processShow = true;
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.progressBarService.processShow = false;
    }, 1000)
  }


}
