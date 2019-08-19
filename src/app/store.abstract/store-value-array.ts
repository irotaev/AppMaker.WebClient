import {BehaviorSubject, Subscription} from 'rxjs';
import * as _ from 'lodash';


export class StoreValueArray<T> extends Array<T> {
  protected readonly _listEvent = new BehaviorSubject<T>(null);

  constructor(_name: string = null) {
    super();
  }

  push(...items: T[]) {
    const number = super.push(...items);

    _.forEach(items, item => {
      this._listEvent.next(item);
    });

    return number;
  }

  updateSilent(...items: T[]) {
    this.removeSilent();
    return super.push(...items);
  }

  removeSilent() {
    _.remove(this, () => true);
  }

  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this._listEvent.subscribe(next, error, complete);
  }
}
