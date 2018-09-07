import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelPickerComponent } from './control-panel-picker.component';

describe('ControlPanelPickerComponent', () => {
  let component: ControlPanelPickerComponent;
  let fixture: ComponentFixture<ControlPanelPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
