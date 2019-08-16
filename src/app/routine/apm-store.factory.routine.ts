import {ApmCStore} from '../store/apm-c.store';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {UniqueElementRoutine} from './unique-element.routine';
import {ApmCFactoryRoutine} from './apm-c.factory.routine';
import {ListStore} from '../store/list.store';
import {ComponentRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApmStoreFactoryRoutine {
  constructor(
    private _uniqueElementRoutine: UniqueElementRoutine,
    private _apmCFactoryRoutine: ApmCFactoryRoutine,
    private _listStore: ListStore) {
  }

  createStore<T extends ApmComponent>(componentRef: ComponentRef<T> = null): ApmCStore<T> {
    return new ApmCStore<T>(this._uniqueElementRoutine, this._apmCFactoryRoutine, this._listStore, componentRef);
  }
}
