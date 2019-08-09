import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFlexboxComponent } from './component-flexbox.component';

describe('ComponentFlexboxComponent', () => {
  let component: ComponentFlexboxComponent;
  let fixture: ComponentFixture<ComponentFlexboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentFlexboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentFlexboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
