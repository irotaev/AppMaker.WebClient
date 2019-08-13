import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmpCFlexboxComponent } from './ampCFlexbox.component';

describe('CFlexboxComponent', () => {
  let component: AmpCFlexboxComponent;
  let fixture: ComponentFixture<AmpCFlexboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmpCFlexboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmpCFlexboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
