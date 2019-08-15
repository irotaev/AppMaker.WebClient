import {Store} from '../store.abstract/store';
import {StoreValueField} from '../store.abstract/store-value-field';
import {UniqueElementService} from '../abstract/unique-element.service';

export class ComponentSettingsStore extends Store {
  parentComponentUniqueId = new StoreValueField<string>();
  childComponentUniqueIds = new StoreValueField<string[]>().setValue([]).storeField;
  cssSettingsAll = new StoreValueField<CssSettings[]>().setValue([]).storeField;
  cssSettingsCurrent = new StoreValueField<CssSettings>();
  events = new StoreValueField<Store>().setValue(new Store(this._uniqueElementService));

  constructor(_uniqueElementService: UniqueElementService) {
    super(_uniqueElementService);
    this.bindFields();
  }
}

export class CssSettings extends Store {
  screenWidth = new StoreValueField<string>();
  settings = new StoreValueField<Store>();

  constructor(uniqueElementService: UniqueElementService) {
    super(uniqueElementService);
    this.bindFields();
  }
}
