import {ApmCStore} from '../store/apm-c.store';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {UniqueElementRoutine} from './unique-element.routine';
import {ApmCFactoryRoutine} from './apm-c.factory.routine';
import {ListStore} from '../store/list.store';
import {ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {TypeFromStrRoutine} from './type-from-str.routine';
import {AppComponent} from '../app.component';
import {StyleSettingsStoreFactoryRoutine} from './style-settings-store.factory.routine';
import {StoreFactoryRoutine} from './store.factory.routine';

@Injectable({
  providedIn: 'root',
})
export class ApmCStoreFactoryRoutine {
  constructor(
    private _uniqueElementRoutine: UniqueElementRoutine,
    private _apmCFactoryRoutine: ApmCFactoryRoutine,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _typeFromStrRoutine: TypeFromStrRoutine,
    private _listStore: ListStore,
    private _settingsStoreFactoryRoutine: StyleSettingsStoreFactoryRoutine,
    private _storeFactoryRoutine: StoreFactoryRoutine) {
  }

  createApmComponentStore<T extends ApmComponent>(componentRef: ComponentRef<T> | Type<T> | string, parentComponentStoreUniqueId: string): ApmCStore<T> {
    const store = new ApmCStore<T>();

    this._listStore.addStore(store);

    store.parentComponentStoreUniqueId.setValue(parentComponentStoreUniqueId);
    store.initComponent(componentRef);

    return store;
  }

  createApmComponentStoreCustom<T extends ApmComponent>(componentType: Type<T> | string, insertToView: ViewContainerRef): ApmCStore<T> {
    const store = new ApmCStore<T>();

    this._listStore.addStore(store);

    const component = this._apmCFactoryRoutine.createComponent(componentType, insertToView);
    store.initComponent(component);


    return store;
  }

  createApmComponentStoreEmpty<T extends AppComponent>(): ApmCStore<T> {
    const store = new ApmCStore<T>();

    this._listStore.addStore(store);

    return store;
  }
}
