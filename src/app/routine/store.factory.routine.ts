import {QueueRoutine} from './queue.routine';
import {StoreEventField} from '../store.abstract/store-event-field';
import {StoreValueArray} from '../store.abstract/store-value-array';
import {StoreValueField} from '../store.abstract/store-value-field';
import {Injectable} from '@angular/core';
import {UniqueElementRoutine} from './unique-element.routine';
import {StyleSettingsStore} from "../store/style-settings.store";

@Injectable({
  providedIn: 'root',
})
export class StoreFactoryRoutine {
  constructor(private _queueRoutine: QueueRoutine, private _uniqueElementRoutine: UniqueElementRoutine) {
  }

  StoreEventField<T>(_name: string = null): StoreEventField<T> {
    return new StoreEventField<T>(this._queueRoutine, _name);
  }

  StoreValueArray<T>(_name: string = null): StoreValueArray<T> {
    return new StoreValueArray<T>(this._queueRoutine, _name);
  }

  StoreValueField<T>(_name: string = null): StoreValueField<T> {
    return new StoreValueField<T>(this._queueRoutine, _name);
  }

  StyleSettingsStore(): StyleSettingsStore {
    return new StyleSettingsStore(this._uniqueElementRoutine, this._queueRoutine);
  }
}
