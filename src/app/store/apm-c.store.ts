import {Store} from '../store.abstract/store';
import {ApmCFactoryRoutine} from '../routine/apm-c.factory.routine';
import {ListStore} from './list.store';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {ComponentRef, Type} from '@angular/core';
import {StoreValueArray} from '../store.abstract/store-value-array';

import * as _ from 'lodash';
import {StyleSettingsStoreFactoryRoutine} from '../routine/style-settings-store.factory.routine';
import {StoreFactoryRoutine} from '../routine/store.factory.routine';
import {StyleSettingsStore} from './style-settings.store';
import {JsonObject, JsonProperty} from 'json2typescript';
import {StoreValueField} from '../store.abstract/store-value-field';
import {QueueRoutine} from '../routine/queue.routine';

@JsonObject()
export class ApmCStore<TComponent extends ApmComponent> extends Store {
  private _apmCFactoryRoutine: ApmCFactoryRoutine;
  private _listStore: ListStore;
  private _settingsStoreFactoryRoutine: StyleSettingsStoreFactoryRoutine;

  private _storeFactoryRoutine: StoreFactoryRoutine;
  get storeFactoryRoutine(): StoreFactoryRoutine {
    this._storeFactoryRoutine = this._storeFactoryRoutine || QueueRoutine.injector.get(StoreFactoryRoutine);

    return this._storeFactoryRoutine;
  }

  constructor() {
    super();

    const injector = QueueRoutine.injector;
    this._apmCFactoryRoutine = injector.get(ApmCFactoryRoutine);
    this._listStore = injector.get(ListStore);
    this._settingsStoreFactoryRoutine = injector.get(StyleSettingsStoreFactoryRoutine);

    this.bindFields();

    this.setEvents();
  }

  @JsonProperty('parentComponentStoreUniqueId', StoreValueField)
  parentComponentStoreUniqueId = this.storeFactoryRoutine.StoreValueField<string>();

  @JsonProperty('childComponentStoreUniqueIds', StoreValueField)
  childComponentStoreUniqueIds = this.storeFactoryRoutine.StoreValueField<string[]>().setValue([]).storeField;

  @JsonProperty('styleSettingsAll', StoreValueField)
  styleSettingsAll = this.storeFactoryRoutine.StoreValueField<StoreValueArray<StyleSettingsStore>>().setValue(this.storeFactoryRoutine.StoreValueArray<StyleSettingsStore>()).storeField;

  @JsonProperty('styleSettingsCurrent', StoreValueField)
  styleSettingsCurrent = this.storeFactoryRoutine.StoreValueField<StyleSettingsStore>();

  @JsonProperty('events', StoreValueField)
  events = this.storeFactoryRoutine.StoreValueField<Store>().setValue(new Store()).storeField;

  @JsonProperty()
  componentType: string | Type<TComponent> = null;

  @JsonProperty('events', StoreValueField)
  customSettings = this.storeFactoryRoutine.StoreValueField<Store>().setValue(new Store()).storeField;

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

  public initComponent(component: ComponentRef<TComponent> | Type<TComponent> | string) {
    if (!component) {
      throw new Error('Component should be set for store initialization as Type or ComponentRef');
    }

    if (component instanceof ComponentRef) {
      this._apmComponentRef = component as ComponentRef<TComponent>;
      this.componentType = (component.instance as object).constructor.name;
      this.syncStoreToComponentIds();
    } else {
      this.componentType = component;
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

