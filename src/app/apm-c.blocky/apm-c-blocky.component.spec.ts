import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmCBlockyComponent } from './apm-c-blocky.component';

describe('ApmCBlockyComponent', () => {
  let component: ApmCBlockyComponent;
  let fixture: ComponentFixture<ApmCBlockyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApmCBlockyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApmCBlockyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
