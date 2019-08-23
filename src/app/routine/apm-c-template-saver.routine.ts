import {ApmCStore} from '../store/apm-c.store';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {ListStore} from '../store/list.store';
import {AbstractRoutine} from '../routine.abstract/abstract.routine';
import * as _ from 'lodash';

export class ApmCTemplateSaverRoutine extends AbstractRoutine {
  constructor(private _listStore: ListStore) {
    super();
  }

  saveToTemplate() {
    const artboarStore = this._listStore.getStoreByUniqueId<ApmCStore<ApmComponent>>('__ApmCArtboard');

    _.forEach(artboarStore.childComponentStoreUniqueIds, cId => {

    });
  }
}
