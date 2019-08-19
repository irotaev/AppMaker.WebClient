import {Store} from '../store.abstract/store';
import {UniqueElementRoutine} from '../routine/unique-element.routine';
import {QueueRoutine} from '../routine/queue.routine';
import {StoreValueField} from '../store.abstract/store-value-field';

export class StyleSettingsStore extends Store {
  constructor(uniqueElementService: UniqueElementRoutine, private  _queueRoutine: QueueRoutine) {
    super(uniqueElementService);
    this.bindFields();
  }

  screenWidth = new StoreValueField<string>(this._queueRoutine);
  settings = new StoreValueField<Store>(this._queueRoutine);
}
