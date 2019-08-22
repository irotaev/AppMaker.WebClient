import {Store} from '../store.abstract/store';
import {UniqueElementRoutine} from '../routine/unique-element.routine';
import {ApmCFactoryRoutine} from '../routine/apm-c.factory.routine';
import {ListStore} from './list.store';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {ComponentRef, Type} from '@angular/core';
import {StoreValueArray} from '../store.abstract/store-value-array';

import * as _ from 'lodash';
import {StyleSettingsStoreFactoryRoutine} from '../routine/style-settings-store.factory.routine';
import {StoreFactoryRoutine} from '../routine/store.factory.routine';
import {StyleSettingsStore} from './style-settings.store';

export class ApmCStore<TComponent extends ApmComponent> extends Store {
  constructor(
    _uniqueElementService: UniqueElementRoutine,
    private _apmCFactoryRoutine: ApmCFactoryRoutine,
    private _listStore: ListStore,
    private _settingsStoreFactoryRoutine: StyleSettingsStoreFactoryRoutine,
    private _storeFactoryRoutine: StoreFactoryRoutine) {
    super(_uniqueElementService);
    this.bindFields();

    this.setEvents();
  }

  parentComponentStoreUniqueId = this._storeFactoryRoutine.StoreValueField<string>();
  childComponentStoreUniqueIds = this._storeFactoryRoutine.StoreValueField<string[]>().setValue([]).storeField;
  styleSettingsAll = this._storeFactoryRoutine.StoreValueField<StoreValueArray<StyleSettingsStore>>().setValue(this._storeFactoryRoutine.StoreValueArray<StyleSettingsStore>()).storeField;
  styleSettingsCurrent = this._storeFactoryRoutine.StoreValueField<StyleSettingsStore>();
  events = this._storeFactoryRoutine.StoreValueField<Store>().setValue(new Store(this._uniqueElementService)).storeField;
  componentType: string | Type<TComponent>;
  customSettings = this._storeFactoryRoutine.StoreValueField<Store>().setValue(new Store(this._uniqueElementService)).storeField;

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

  public initComponent(componentRef: ComponentRef<TComponent> | Type<TComponent> | string) {
    if (!componentRef) {
      throw new Error('Component should be set for store initialization as Type or ComponentRef');
    }

    if (componentRef instanceof ComponentRef) {
      this._apmComponentRef = componentRef as ComponentRef<TComponent>;
      this.componentType = (this._apmComponentRef as object).constructor.name;
      this.syncStoreToComponentIds();
    } else {
      this.componentType = componentRef as Type<TComponent>;
      this.createComponent();
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
      const sortedArray = _.reverse(_.sortBy(this.styleSettingsAll.value, x => parseInt(x.screenWidth.value, 10)));
      this.styleSettingsAll.value.updateSilent(...sortedArray);
    });
  }
}

