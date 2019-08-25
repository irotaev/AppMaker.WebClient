import {Component, Injector, OnInit, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';

import * as _ from 'lodash';
import {StoreValueField} from '../store.abstract/store-value-field';
import {ApmCStoreFactoryRoutine} from '../routine/apm-c-store.factory.routine';
import {ListStore} from '../store/list.store';
import {ApmCStore} from '../store/apm-c.store';
import {StoreValueArray} from '../store.abstract/store-value-array';

@Component({
  selector: 'apm-apm-c-property-editor',
  templateUrl: './apm-c-property-editor.component.html',
  styleUrls: ['./apm-c-property-editor.component.scss']
})
export class ApmCPropertyEditorComponent extends ApmComponent implements OnInit {

  constructor(
    injector: Injector,
    private _apmCStoreFactoryRoutine: ApmCStoreFactoryRoutine,
    private _listStore: ListStore) {
    super(injector);
  }

  childComponentsContainer: ViewContainerRef = null;
  customPropertyName: string;

  ngOnInit() {
  }

  apmOnComponentInit() {
    // No need!
    //
    // super.apmOnComponentInit();
  }

  addCssProperty(screenWidth) {
    const settings = _.find(this.apmComponentSettingsStore.styleSettingsAll.value, x => x.screenWidth.value === screenWidth);

    settings.settings.value.addField(new StoreValueField(this.customPropertyName));
  }

  saveComponent() {
    const compositeComponentStore = this._apmCStoreFactoryRoutine.createApmComponentStoreEmpty();

    const artboarStore = this._listStore.getStoreByUniqueId<ApmCStore<ApmComponent>>('__ApmCArtboard');
    const cListStore = this._listStore.getStoreByUniqueId<ApmCStore<ApmComponent>>('__ApmCList');

    _.forEach(artboarStore.childComponentStores.value, childStore => {
      compositeComponentStore.childComponentStores.value.push(childStore);
    });

    cListStore.customSettings.value.getField<StoreValueArray<ApmCStore<ApmComponent>>>('dynamicComponentStores')
      .value.push(compositeComponentStore);
  }
}
