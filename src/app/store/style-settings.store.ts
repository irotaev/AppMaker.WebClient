import {Store} from '../store.abstract/store';
import {StoreValueField} from '../store.abstract/store-value-field';

export class StyleSettingsStore extends Store {
  constructor() {
    super();
    this.bindFields();
  }

  screenWidth = new StoreValueField<string>();
  settings = new StoreValueField<Store>();
}
