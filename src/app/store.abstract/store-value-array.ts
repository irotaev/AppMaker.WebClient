import {BehaviorSubject, Subscription} from 'rxjs';
import * as _ from 'lodash';
import {QueueRoutine} from '../routine/queue.routine';


export class StoreValueArray<T> extends Array<T> {
  protected readonly _listEvent = new BehaviorSubject<T>(null);

  constructor(protected _queueRoutine: QueueRoutine, _name: string = null) {
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

  subscribeWithOrder(
    key: string,
    index: number,
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void): string {

    if (this._queueRoutine.addRoutine(key, index, next)) {

      this._listEvent.subscribe((value: T) => {
        this._queueRoutine.next(key, value);
      }, error, complete);
    }

    return key;
  }
}
