import {StyleSettingsStore} from '../store/apm-c.store';
import {UniqueElementRoutine} from './unique-element.routine';
import {Store} from '../store.abstract/store';
import {StoreValueField} from '../store.abstract/store-value-field';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleSettingsStoreFactoryRoutine {
  constructor(private _uniqueElementRoutine: UniqueElementRoutine) {

  }

  createSettings(width: string): StyleSettingsStore {
    const settingsStore = new StyleSettingsStore(this._uniqueElementRoutine);
    settingsStore.screenWidth.setValue(width);
    settingsStore.settings.setValue(new Store(this._uniqueElementRoutine)
      .addField(new StoreValueField('width').setValue('200px').storeField).store
      .addField(new StoreValueField('height').setValue('50px').storeField).store);

    return settingsStore;
  }
}
