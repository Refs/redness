import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class HeaderToggleButtonService {
  // when the state is false , the button icon is menu
  private _toggleButtonState: boolean = false;


  private __toggleButtonStateTriggered: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._toggleButtonState);
  public toggleButtonStateCast$: Observable<boolean> = this.__toggleButtonStateTriggered.asObservable();

    /**
     * Getter toggleButtonState
     * @return {boolean }
     */
	public get toggleButtonState(): boolean  {
		return this._toggleButtonState;
	}
    /**
     * Setter toggleButtonState
     * @param {boolean } value
     */
	public set toggleButtonState(value: boolean ) {
    this._toggleButtonState = value;
    this.__toggleButtonStateTriggered.next(this._toggleButtonState);
	}



}
