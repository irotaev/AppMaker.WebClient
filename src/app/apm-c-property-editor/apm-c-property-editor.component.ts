import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apmC.abstract/apmC';
import {StoreToClassAdapter} from '../routine/storeToClassAdapter.service';
import {UniqueElementService} from '../abstract/uniqueElement.service';

@Component({
  selector: 'apm-apm-c-property-editor',
  templateUrl: './apm-c-property-editor.component.html',
  styleUrls: ['./apm-c-property-editor.component.scss']
})
export class ApmCPropertyEditorComponent extends ApmComponent implements OnInit {

  constructor(storeToClassAdapter: StoreToClassAdapter, uniqueElementService: UniqueElementService) {
    super(storeToClassAdapter, uniqueElementService);
  }

  componentContainer: ViewContainerRef = null;

  ngOnInit() {
  }

}
