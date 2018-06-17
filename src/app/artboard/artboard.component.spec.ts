import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtboardComponent } from './artboard.component';

describe('ArtboardComponent', () => {
  let component: ArtboardComponent;
  let fixture: ComponentFixture<ArtboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
