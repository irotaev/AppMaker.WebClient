import {Store} from '../store.abstract/store';
import {StoreField} from '../store.abstract/store-field';
import {UniqueElementService} from '../abstract/unique-element.service';

export class ComponentSettings extends Store {
  constructor(uniqueElementService: UniqueElementService) {
    super(uniqueElementService);
    this.bindFields();
  }

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
