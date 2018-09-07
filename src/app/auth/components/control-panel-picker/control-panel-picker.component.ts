import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-control-panel-picker',
  templateUrl: './control-panel-picker.component.html',
  styleUrls: ['./control-panel-picker.component.scss']
})
export class ControlPanelPickerComponent implements OnInit {

  @Input()
  public username: string;

  constructor() { }

  ngOnInit() {
  }

}
