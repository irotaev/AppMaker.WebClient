import {Injectable} from '@angular/core';
import {IStore} from './iStore';
import {UniqueStoreElement} from '../abstract/unique-store-element';
import {UniqueElementService} from '../routine/unique-element.service';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class StoreDispatcher {
  constructor(private _uniqueElementService: UniqueElementService) {
  }

  private readonly _stores: UniqueStoreElement<IStore>[] = [];

  addStore(store: IStore) {
    this._stores.push(new UniqueStoreElement(store, this._uniqueElementService.generateUniqueId()));
  }

  getStore(uniqueId: number) {
    return _.find(this._stores, x => x.uniqueId === uniqueId);
  }

  getStoreByIndex(index: number) {
    return this._stores[index];
  }
}
