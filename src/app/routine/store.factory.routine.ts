import {StoreEventField} from '../store.abstract/store-event-field';
import {StoreValueArray} from '../store.abstract/store-value-array';
import {StoreValueField} from '../store.abstract/store-value-field';
import {Injectable} from '@angular/core';
import {StyleSettingsStore} from '../store/style-settings.store';

@Injectable({
  providedIn: 'root',
})
export class StoreFactoryRoutine {
  constructor() {
  }

  StoreEventField<T>(_name: string = null): StoreEventField<T> {
    return new StoreEventField<T>(_name);
  }

  StoreValueArray<T>(_name: string = null): StoreValueArray<T> {
    return new StoreValueArray<T>(_name);
  }

  StoreValueField<T>(_name: string = null): StoreValueField<T> {
    return new StoreValueField<T>(_name);
  }

  StyleSettingsStore(): StyleSettingsStore {
    return new StyleSettingsStore();
  }
}
