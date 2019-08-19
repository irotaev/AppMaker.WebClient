import {Store} from '../store.abstract/store';
import {StoreValueField} from '../store.abstract/store-value-field';
import {UniqueElementRoutine} from '../routine/unique-element.routine';
import {ApmCFactoryRoutine} from '../routine/apm-c.factory.routine';
import {ListStore} from './list.store';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {ComponentRef, Type} from '@angular/core';
import {StoreValueArray} from '../store.abstract/store-value-array';

import * as _ from 'lodash';
import {StyleSettingsStoreFactoryRoutine} from '../routine/style-settings-store.factory.routine';

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
    private _listStore: ListStore,
    private _settingsStoreFactoryRoutine: StyleSettingsStoreFactoryRoutine) {
    super(_uniqueElementService);
    this.bindFields();

    this.setEvents();
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
    this._apmComponent.apmComponentSettingsStore = this;

    this._apmComponent.apmOnComponentInit();

    this.enableStyleResponsiveness();
  }

  private enableStyleResponsiveness() {
    const parentStore = this._listStore.getStoreByUniqueId<ApmCStore<ApmComponent>>(this.parentComponentStoreUniqueId.value);

    if (!parentStore) {
      return;
    }

    parentStore.styleSettingsCurrent.value.getField<Store>('settings').value.getField('width').subscribe((width: string) => {
      const newStyle = _.find(this.styleSettingsAll.value, x => parseInt(x.screenWidth.value, 10) <= parseInt(width, 10));

      if (!newStyle) {
        return;
      }

      this.styleSettingsCurrent.setValue(newStyle);
    });
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

  private setDefaultStyleSettings() {
    const defaultStyleSettings = this._settingsStoreFactoryRoutine.createSettings('1920px');

    this.styleSettingsAll.value.push(defaultStyleSettings);
    this.styleSettingsCurrent.setValue(defaultStyleSettings);
  }

  private setEvents() {
    this.styleSettingsAll.value.subscribe(() => {
      const sortedArray = _.reverse( _.sortBy(this.styleSettingsAll.value, x => parseInt(x.screenWidth.value, 10)));
      this.styleSettingsAll.value.updateSilent(...sortedArray);
    });
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
