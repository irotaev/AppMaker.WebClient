import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmCListComponent } from './apm-c-list.component';

describe('ComponentListComponent', () => {
  let component: ApmCListComponent;
  let fixture: ComponentFixture<ApmCListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApmCListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApmCListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
