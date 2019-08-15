import {IStore} from './i-store';
import {UniqueElementService} from '../abstract/unique-element.service';

import * as _ from 'lodash';
import {StoreField} from './store-field';

export class Store implements IStore {
  constructor(private _uniqueElementService: UniqueElementService) {
    this.uniqueId = this._uniqueElementService.generateUniqueId();
  }

  get fields() {
    return this._fields;
  }

  private readonly _fields: StoreField<any>[] = [];

  readonly uniqueId: string;

  protected bindFields() {
    const fields = Object.getOwnPropertyNames(this);
    _.forEach(fields, field => {
      if ((this[field] as object).constructor.name === 'StoreField') {
        this.addField(this[field]);
      }
    });
  }

  addField<T>(field: StoreField<T>): { field: StoreField<T>; store: Store } {
    this._fields.push(field);

    return {field, store: this};
  }

  getField<T>(name: string): StoreField<T> {
    return _.find(this._fields, x => x.name === name);
  }

  getFieldByIndex<T>(index: number): StoreField<T> {
    return this._fields[index];
  }

  toNameValueJson(): object {
    const json: any = {};

    _.forEach(this._fields, (x, index, collection) => {
      json[x.name] = x.value;
    });

    return json;
  }
}
