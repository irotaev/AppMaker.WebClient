import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {UniqueElementService} from '../abstract/unique-element.service';
import {ComponentDispatcher} from '../apm-c.abstract/apm-c-dispatcher';

@Component({
  selector: 'apm-apm-c-property-editor',
  templateUrl: './apm-c-property-editor.component.html',
  styleUrls: ['./apm-c-property-editor.component.scss']
})
export class ApmCPropertyEditorComponent extends ApmComponent implements OnInit {

  constructor(uniqueElementService: UniqueElementService, componentDispatcher: ComponentDispatcher) {
    super(uniqueElementService, componentDispatcher);
  }

  childComponentsContainer: ViewContainerRef = null;

  ngOnInit() {
  }

}
