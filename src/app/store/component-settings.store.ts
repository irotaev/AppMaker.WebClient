import {Store} from '../store.abstract/store';
import {StoreField} from '../store.abstract/store-field';
import {UniqueElementService} from '../abstract/unique-element.service';

export class ComponentSettingsStore extends Store {
  constructor(uniqueElementService: UniqueElementService) {
    super(uniqueElementService);
    this.bindFields();
  }

  parentComponentUniqueId = new StoreField<string>();
  childComponentUniqueIds = new StoreField<string[]>().setValue([]).storeField;

  cssSettingsAll = new StoreField<CssSettings[]>().setValue([]).storeField;
  cssSettingsCurrent = new StoreField<CssSettings>();
}

export class CssSettings extends Store {
  constructor(uniqueElementService: UniqueElementService) {
    super(uniqueElementService);
    this.bindFields();
  }

  screenWidth = new StoreField<string>();
  settings = new StoreField<Store>();
}
