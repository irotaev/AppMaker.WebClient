import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmCPropertyListComponent } from './apm-c-property-list.component';

describe('ApmCPropertyListComponent', () => {
  let component: ApmCPropertyListComponent;
  let fixture: ComponentFixture<ApmCPropertyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApmCPropertyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApmCPropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
