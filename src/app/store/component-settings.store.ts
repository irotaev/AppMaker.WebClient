import {Store} from '../store.abstract/store';
import {StoreField} from '../store.abstract/store-field';
import {UniqueElementService} from '../abstract/unique-element.service';

export class ComponentSettingsStore extends Store {
  constructor(uniqueElementService: UniqueElementService) {
    super(uniqueElementService);
    this.bindFields();
  }

  parentComponentUniqueId = new StoreField<string>('parentComponentUniqueId');
  childComponentUniqueIds = new StoreField<string[]>('childComponentUniqueIds').setValue([]).storeField;

  cssSettingsAll = new StoreField<Array<CssSettings>>('cssSettingsAll').setValue([]).storeField;
  cssSettingsCurrent = new StoreField<CssSettings>('cssSettingsCurrent');
}

export class CssSettings extends Store {
  constructor(uniqueElementService: UniqueElementService) {
    super(uniqueElementService);
    this.bindFields();
  }

  screenWidth = new StoreField<string>('screenWidth');
  settings = new StoreField<Store>('settings');
}
