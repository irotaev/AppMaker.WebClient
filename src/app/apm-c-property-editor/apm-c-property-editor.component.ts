import {Component, Injector, OnInit, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';

@Component({
  selector: 'apm-apm-c-property-editor',
  templateUrl: './apm-c-property-editor.component.html',
  styleUrls: ['./apm-c-property-editor.component.scss']
})
export class ApmCPropertyEditorComponent extends ApmComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  childComponentsContainer: ViewContainerRef = null;

  ngOnInit() {
  }
}
