import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CListComponent } from './cList.component';

describe('ComponentListComponent', () => {
  let component: CListComponent;
  let fixture: ComponentFixture<CListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
