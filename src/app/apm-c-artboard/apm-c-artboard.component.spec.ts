import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmCArtboardComponent } from './apm-c-artboard.component';

describe('ApmCArtboardComponent', () => {
  let component: ApmCArtboardComponent;
  let fixture: ComponentFixture<ApmCArtboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApmCArtboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApmCArtboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
