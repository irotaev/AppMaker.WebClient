import {Injectable} from '@angular/core';
import {Store} from '../store.abstract/store';
import {UniqueElementRoutine} from './unique-element.routine';

import * as _ from 'lodash';
import {StoreValueField} from '../store.abstract/store-value-field';

@Injectable({
  providedIn: 'root',
})
export class StoreToClassAdapter {
  constructor(private _uniqueElementService: UniqueElementRoutine) {
  }

  toStore<T>(obj: T): Store {
    const store = new Store(this._uniqueElementService);

    const fieldNames = Object.getOwnPropertyNames(obj);
    _.forEach(fieldNames, objField => {
      const storeField = new StoreValueField(objField);

      if (typeof obj[objField] === 'object' && (obj[objField] as object).constructor.name !== 'Store') {

        if ((obj[objField] as object).constructor.name === 'Array') {
          const value = [];
          _.forEach(obj[objField] as Array<any>, e => {
            value.push(this.toStore(e));
          });

          storeField.setValue(value);
        } else {
          storeField.setValue(this.toStore(obj[objField]));
        }
      } else {
        storeField.setValue(obj[objField]);
      }

      store.addField(storeField);
    });

    return store;
  }
}
