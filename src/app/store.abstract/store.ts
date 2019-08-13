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

  addField<T>(field: StoreField<T>) {
    this._fields.push(field);
  }

  getField<T>(name: string) {
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
