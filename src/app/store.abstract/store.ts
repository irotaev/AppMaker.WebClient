import {IStore} from './i-store';
import {UniqueElementRoutine} from '../routine/unique-element.routine';

import * as _ from 'lodash';
import {IStoreField} from './i-store-field';
import {StoreEventField} from './store-event-field';

export class Store implements IStore {
  uniqueId: string;
  private readonly _fields: IStoreField<any>[] = [];

  constructor(protected _uniqueElementService: UniqueElementRoutine) {
    this.uniqueId = this._uniqueElementService.generateUniqueId();
  }

  get fields() {
    return this._fields;
  }

  addField<T>(field: IStoreField<T>): { field: IStoreField<T>; store: Store } {
    if (!field.name) {
      throw new Error('Field must have not empty name');
    }

    if (_.find(this._fields, x => x.name === field.name)) {
      throw new Error('Current Store is only uniqueNames but you try to insert duplicate name: ' + field.name);
    }

    this._fields.push(field);

    return {field, store: this};
  }

  getField<T>(name: string): IStoreField<T> {
    return _.find(this._fields, x => x.name === name);
  }

  getFieldByIndex<T>(index: number): IStoreField<T> {
    return this._fields[index];
  }

  toNameValueJson(): object {
    const json: any = {};

    _.forEach(this._fields, x => {
      json[x.name] = x.value;
    });

    return json;
  }

  protected bindFields() {
    const fields = Object.getOwnPropertyNames(this);
    _.forEach(fields, fieldName => {

      if ((this[fieldName] as object) instanceof StoreEventField) {
        if (!this[fieldName].name) {
          this[fieldName].name = fieldName;
        }

        this.addField(this[fieldName]);
      }

    });
  }
}
