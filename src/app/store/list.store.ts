import {Store} from '../store.abstract/store';
import {Injectable} from '@angular/core';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ListStore extends Store {
  private readonly _stores: Store[] = [];

  addStore(store: Store) {
    this._stores.push(store);
  }

  getStoreByUniqueId<T extends Store>(uniqueId: string): T {
    return _.find(this._stores, x => x.uniqueId === uniqueId) as T;
  }
}
