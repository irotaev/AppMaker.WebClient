import {Component, Injector, OnInit, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';

import * as _ from 'lodash';
import {StoreValueField} from '../store.abstract/store-value-field';

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
  customPropertyName: string;

  ngOnInit() {
  }

  apmOnComponentInit() {
    super.apmOnComponentInit();
  }

  addCssProperty(screenWidth) {
    console.log(screenWidth);

    const settings = _.find(this.apmComponentSettingsStore.styleSettingsAll.value, x => x.screenWidth.value === screenWidth);

    settings.settings.value.addField(new StoreValueField(this.customPropertyName));
  }
}
