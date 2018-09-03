import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class SidenavCloseService {
  private _sidenavAction: number = 1;


  private _sidenavActionTriggered: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public sidenavActionCast$: Observable<number> = this._sidenavActionTriggered.asObservable();

  constructor() {}

    /**
     * Getter sidenavAction
     * @return {number }
     */
	public get sidenavAction(): number  {
		return this._sidenavAction;
	}

    /**
     * Setter sidenavAction
     * @param {number } value
     */
	public set sidenavAction(value: number ) {
    this._sidenavAction = value;
    this._sidenavActionTriggered.next(this._sidenavAction);
	}


}

