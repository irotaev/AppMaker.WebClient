import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CPropertyListComponent } from './cPropertyList.component';

describe('CPropertyListComponent', () => {
  let component: CPropertyListComponent;
  let fixture: ComponentFixture<CPropertyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CPropertyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CPropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
