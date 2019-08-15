import {Store} from '../store.abstract/store';
import {StoreScalarField} from '../store.abstract/store-scalar-field';
import {UniqueElementService} from '../abstract/unique-element.service';

export class ComponentSettingsStore extends Store {
  constructor(uniqueElementService: UniqueElementService) {
    super(uniqueElementService);
    this.bindFields();
  }

  parentComponentUniqueId = new StoreScalarField<string>();
  childComponentUniqueIds = new StoreScalarField<string[]>().setValue([]).storeField;

  cssSettingsAll = new StoreScalarField<CssSettings[]>().setValue([]).storeField;
  cssSettingsCurrent = new StoreScalarField<CssSettings>();

  event
}

export class CssSettings extends Store {
  constructor(uniqueElementService: UniqueElementService) {
    super(uniqueElementService);
    this.bindFields();
  }

  screenWidth = new StoreScalarField<string>();
  settings = new StoreScalarField<Store>();
}
