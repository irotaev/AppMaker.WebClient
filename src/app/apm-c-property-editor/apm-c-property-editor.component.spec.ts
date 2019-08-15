import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmCPropertyEditorComponent } from './apm-c-property-editor.component';

describe('ApmCPropertyEditorComponent', () => {
  let component: ApmCPropertyEditorComponent;
  let fixture: ComponentFixture<ApmCPropertyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApmCPropertyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApmCPropertyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
