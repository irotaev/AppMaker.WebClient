import {UniqueElementRoutine} from './unique-element.routine';
import {Store} from '../store.abstract/store';
import {StoreValueField} from '../store.abstract/store-value-field';
import {Injectable} from '@angular/core';
import {StoreFactoryRoutine} from './store.factory.routine';
import {StyleSettingsStore} from "../store/style-settings.store";

@Injectable({
  providedIn: 'root',
})
export class StyleSettingsStoreFactoryRoutine {
  constructor(
    private _uniqueElementRoutine: UniqueElementRoutine,
    private _storeFactoryRoutine: StoreFactoryRoutine) {

  }

  createSettings(width: string): StyleSettingsStore {
    const settingsStore = this._storeFactoryRoutine.StyleSettingsStore();
    settingsStore.screenWidth.setValue(width);
    settingsStore.settings.setValue(new Store());
      // .addField(this._storeFactoryRoutine.StoreValueField('width').setValue('200px').storeField).store
      // .addField(this._storeFactoryRoutine.StoreValueField('height').setValue('50px').storeField).store);

    return settingsStore;
  }
}
