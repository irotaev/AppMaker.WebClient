import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmCBlocklyComponent } from './apm-c-blockly.component';

describe('ApmCBlocklyComponent', () => {
  let component: ApmCBlocklyComponent;
  let fixture: ComponentFixture<ApmCBlocklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApmCBlocklyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApmCBlocklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
