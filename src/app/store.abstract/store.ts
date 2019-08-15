import {IStore} from './iStore';
import {UniqueElementService} from '../abstract/uniqueElement.service';
import {UniqueElement} from '../abstract/uniqueElement';

import * as _ from 'lodash';
import {StoreField} from './storeField';

export class Store extends UniqueElement<IStore> implements IStore {
  constructor(private _uniqueElementService: UniqueElementService) {
    super(null, _uniqueElementService.generateUniqueId());
  }

  private readonly _fields: StoreField<any>[] = [];

  get fields() {
    return this._fields;
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
