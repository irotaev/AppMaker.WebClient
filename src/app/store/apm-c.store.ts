import {Store} from '../store.abstract/store';
import {StoreValueField} from '../store.abstract/store-value-field';
import {UniqueElementRoutine} from '../routine/unique-element.routine';
import {ApmCFactoryRoutine} from '../routine/apm-c.factory.routine';
import {ListStore} from './list.store';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {ComponentRef, Type} from '@angular/core';
import {StoreValueArray} from '../store.abstract/store-value-array';

export class ApmCStore<TComponent extends ApmComponent> extends Store {

  parentComponentStoreUniqueId = new StoreValueField<string>();
  childComponentStoreUniqueIds = new StoreValueField<string[]>().setValue([]).storeField;
  styleSettingsAll = new StoreValueField<StoreValueArray<StyleSettingsStore>>().setValue(new StoreValueArray<StyleSettingsStore>()).storeField;
  styleSettingsCurrent = new StoreValueField<StyleSettingsStore>();
  events = new StoreValueField<Store>().setValue(new Store(this._uniqueElementService)).storeField;
  componentType: string | Type<TComponent>;

  private _apmComponentRef: ComponentRef<TComponent>;

  private get _apmComponent(): TComponent {
    return this._apmComponentRef && this._apmComponentRef.instance;
  }

  get apmComponent(): ComponentRef<TComponent> {
    return this._apmComponentRef;
  }

  setApmComponent(component: ComponentRef<TComponent>) {
    if (this._apmComponentRef) {
      throw new Error('ComponentRef for current store is already set');
    }

    this._apmComponentRef = component;

    this.syncStoreToComponentIds();
  }

  constructor(
    _uniqueElementService: UniqueElementRoutine,
    private _apmCFactoryRoutine: ApmCFactoryRoutine,
    private _listStore: ListStore) {
    super(_uniqueElementService);
    this.bindFields();
  }

  public initComponent(componentRef: ComponentRef<TComponent> = null) {
    this._apmComponentRef = componentRef;
    if (!componentRef) {
      if (!this.componentType) {
        throw new Error('Component type in current store settings not set, so it component can not be init');
      }

      this.createComponent();
    } else {
      this.componentType = typeof this._apmComponentRef.instance;
      this.syncStoreToComponentIds();
    }

    this.setDefaultStyleSettings();
    this._apmComponent.events = this.events as StoreValueField<Store>;

    this._apmComponent.apmOnComponentInit();
  }

  private createComponent() {
    const parentC = this._listStore.getStoreByUniqueId<ApmCStore<TComponent>>(this.parentComponentStoreUniqueId.value);

    if (!parentC) {
      return;
    }

    if (this.componentType instanceof String) {
      this._apmComponentRef = this._apmCFactoryRoutine.createComponent<TComponent>(
        this.componentType as string,
        parentC.apmComponent.instance);
    } else {
      this._apmComponentRef = this._apmCFactoryRoutine.createComponent<TComponent>(
        this.componentType as Type<TComponent>,
        parentC.apmComponent.instance);
    }

    this.syncStoreToComponentIds();

    parentC.childComponentStoreUniqueIds.value.push(this.uniqueId);
  }

  private syncStoreToComponentIds() {
    this.uniqueId = this._apmComponent.uniqueId || this.uniqueId;
    this._apmComponent.uniqueId = this._apmComponent.uniqueId || this.uniqueId;
  }

  private createDefaultStyleSettings(): StyleSettingsStore {
    const styleSettingsFullHd = new StyleSettingsStore(this._uniqueElementService);
    styleSettingsFullHd.screenWidth.setValue('FullHd');
    styleSettingsFullHd.settings.setValue(new Store(this._uniqueElementService));

    return styleSettingsFullHd;
  }

  private setDefaultStyleSettings() {
    const defaultStyleSettings = this.createDefaultStyleSettings();

    this.styleSettingsAll.subscribe(value => {
      if (this._apmComponent) {
        this._apmComponent.styleSettingsAll = value;
      }
    });
    this.styleSettingsAll.value.push(defaultStyleSettings);

    this.styleSettingsCurrent.subscribe(value => {
      if (this._apmComponent) {
        this._apmComponent.styleSettingsCurrent = value;
      }
    });
    this.styleSettingsCurrent.setValue(defaultStyleSettings);
  }
}

export class StyleSettingsStore extends Store {
  screenWidth = new StoreValueField<string>();
  settings = new StoreValueField<Store>();

  constructor(uniqueElementService: UniqueElementRoutine) {
    super(uniqueElementService);
    this.bindFields();
  }
}
