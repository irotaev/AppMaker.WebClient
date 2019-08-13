import {IStore} from './iStore';
import {UniqueElementService} from '../routine/unique-element.service';
import {UniqueElement} from '../abstract/unique-element';

import * as _ from 'lodash';
import {StoreField} from './store-field';

export class Store extends UniqueElement<IStore> implements IStore {
  constructor(private _uniqueElementService: UniqueElementService) {
    super(null, _uniqueElementService.generateUniqueId());
  }

  private readonly _fields: UniqueElement<StoreField<any>>[] = [];

  addField<T>(field: StoreField<T>) {
    this._fields.push(new UniqueElement(field, this._uniqueElementService.generateUniqueId()));
  }

  addUniqueField<T>(field: UniqueElement<StoreField<T>>) {
    this._fields.push(field);
  }

  getField<T>(uniqueId: number): StoreField<T> {
    return _.find(this._fields, x => x.uniqueId === uniqueId).uniqueElement;
  }

  getFieldByName<T>(name: string) {
    return _.find(this._fields, x => x.uniqueElement.name === name);
  }

  getFieldByIndex<T>(index: number): UniqueElement<StoreField<T>> {
    return this._fields[index];
  }

  toNameValueJson(): object {
    const json: any = {};

    _.forEach(this._fields, (x, index, collection) => {
      json[x.uniqueElement.name] = x.uniqueElement.value;
    });

    return json;
  }
}
