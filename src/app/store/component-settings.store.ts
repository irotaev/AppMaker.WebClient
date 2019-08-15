import {Store} from '../store.abstract/store';
import {StoreValueField} from '../store.abstract/store-value-field';
import {UniqueElementService} from '../abstract/unique-element.service';

export class ComponentSettingsStore extends Store {
  constructor(uniqueElementService: UniqueElementService) {
    super(uniqueElementService);
    this.bindFields();
  }

  parentComponentUniqueId = new StoreValueField<string>();
  childComponentUniqueIds = new StoreValueField<string[]>().setValue([]).storeField;

  cssSettingsAll = new StoreValueField<CssSettings[]>().setValue([]).storeField;
  cssSettingsCurrent = new StoreValueField<CssSettings>();

  event
}

export class CssSettings extends Store {
  constructor(uniqueElementService: UniqueElementService) {
    super(uniqueElementService);
    this.bindFields();
  }

  screenWidth = new StoreValueField<string>();
  settings = new StoreValueField<Store>();
}
