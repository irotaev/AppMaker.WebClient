import {ApmCStore} from '../store/apm-c.store';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {UniqueElementRoutine} from './unique-element.routine';
import {ApmCFactoryRoutine} from './apm-c.factory.routine';
import {ListStore} from '../store/list.store';
import {ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {TypeFromStrRoutine} from './type-from-str.routine';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class ApmStoreFactoryRoutine {
  constructor(
    private _uniqueElementRoutine: UniqueElementRoutine,
    private _apmCFactoryRoutine: ApmCFactoryRoutine,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _typeFromStrRoutine: TypeFromStrRoutine,
    private _listStore: ListStore) {
  }

  createApmComponentStore<T extends ApmComponent>(componentRef: ComponentRef<T> | Type<T> | string, parentComponentStoreUniqueId: string): ApmCStore<T> {
    const store = new ApmCStore<T>(this._uniqueElementRoutine, this._apmCFactoryRoutine, this._listStore);

    this._listStore.addStore(store);

    if (componentRef instanceof ComponentRef) {
      store.parentComponentStoreUniqueId.setValue(parentComponentStoreUniqueId);
      store.initComponent(componentRef);
    } else if (componentRef instanceof Type || String) {
      store.parentComponentStoreUniqueId.setValue(parentComponentStoreUniqueId);
      store.componentType = componentRef;
      store.initComponent();
    }

    return store;
  }

  createApmComponentStoreCustom<T extends ApmComponent>(componentType: ComponentRef<T> | Type<T> | string, insertToView: ViewContainerRef): ApmCStore<T> {
    const store = new ApmCStore<T>(this._uniqueElementRoutine, this._apmCFactoryRoutine, this._listStore);

    this._listStore.addStore(store);

    if (componentType instanceof ComponentRef) {
      store.initComponent(componentType as ComponentRef<T>);
    } else {
      const component = this._apmCFactoryRoutine.createComponent(componentType, insertToView);
      store.initComponent(component);
    }

    return store;
  }

  createApmComponentStoreEmpty<T extends AppComponent>(): ApmCStore<T> {
    const store = new ApmCStore<T>(this._uniqueElementRoutine, this._apmCFactoryRoutine, this._listStore);

    this._listStore.addStore(store);

    return store;
  }
}
