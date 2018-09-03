import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ProcessBarService {

  private _processShow: boolean = false;

  private _processShowChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._processShow);

  public processShowCast$: Observable<boolean> = this._processShowChanged.asObservable();

  constructor() { }


    /**
     * Getter processShow
     * @return {boolean }
     */
	public get processShow(): boolean  {
		return this._processShow;
	}

    /**
     * Setter processShow
     * @param {boolean } value
     */
	public set processShow(value: boolean ) {
    this._processShow = value;
    this._processShowChanged.next(this._processShow);
	}


}

