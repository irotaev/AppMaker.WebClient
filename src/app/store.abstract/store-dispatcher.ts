import {Injectable} from '@angular/core';
import {IStore} from './iStore';

@Injectable({
  providedIn: 'root'
})
export class StoreDispatcher {
  stores: IStore[] = [];

  addStore(store: IStore) {
    this.stores.push(store);
  }
}
