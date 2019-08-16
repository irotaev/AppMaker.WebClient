import {Store} from '../store.abstract/store';
import {StoreValueField} from '../store.abstract/store-value-field';
import {UniqueElementRoutine} from '../routine/unique-element.routine';
import {ApmCFactoryRoutine} from '../routine/apm-c.factory.routine';
import {ListStore} from './list.store';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {ComponentRef} from '@angular/core';

export class ApmCStore<TComponent extends ApmComponent> extends Store {

  get styleSettingsCurrent(): StoreValueField<StyleSettingsStore> {
    return this._styleSettingsCurrent;
  }

  set styleSettingsCurrent(value: StoreValueField<StyleSettingsStore>) {
    this._styleSettingsCurrent = value;

    if (this._apmComponent) {
      this._apmComponent.styleSettings = this._styleSettingsCurrent.value;
    }
  }

  parentComponentStoreUniqueId = new StoreValueField<string>();
  childComponentStoreUniqueIds = new StoreValueField<string[]>().setValue([]).storeField;
  styleSettingsAll = new StoreValueField<StyleSettingsStore[]>().setValue([]).storeField;
  private _styleSettingsCurrent = new StoreValueField<StyleSettingsStore>();
  events = new StoreValueField<Store>().setValue(new Store(this._uniqueElementService));

  private _apmComponentRef: ComponentRef<TComponent>;

  private get _apmComponent(): TComponent {
    return this._apmComponentRef && this._apmComponentRef.instance;
  }

  get apmComponent(): ComponentRef<TComponent> {
    return this._apmComponentRef;
  }

  constructor(
    _uniqueElementService: UniqueElementRoutine,
    private _apmCFactoryRoutine: ApmCFactoryRoutine,
    private _listStore: ListStore,
    componentRef: ComponentRef<TComponent> = null) {
    super(_uniqueElementService);
    this.bindFields();

    this._apmComponentRef = componentRef;
    if (!componentRef) {
      this.createComponent();
    } else {
      this.syncStoreToComponentIds();
    }

    const defaultStyleSettings = this.createDefaultStyleSettings();
    this.styleSettingsAll.value.push(defaultStyleSettings);
    this._styleSettingsCurrent.setValue(defaultStyleSettings);
  }

  private createComponent() {
    const parentC = this._listStore.getStoreByUniqueId<ApmCStore<TComponent>>(this.parentComponentStoreUniqueId.value);

    if (!parentC) {
      return;
    }

    this._apmComponentRef = this._apmCFactoryRoutine.createComponentByStr<TComponent>(
      typeof this._apmComponent,
      parentC.apmComponent.instance);

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
}

export class StyleSettingsStore extends Store {
  screenWidth = new StoreValueField<string>();
  settings = new StoreValueField<Store>();

  constructor(uniqueElementService: UniqueElementRoutine) {
    super(uniqueElementService);
    this.bindFields();
  }
}
