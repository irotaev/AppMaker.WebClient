import {BehaviorSubject, Subscription} from 'rxjs';
import {IStoreField} from './i-store-field';

export class StoreEventField<T> implements IStoreField<T> {
  protected readonly valueEvent: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  constructor(protected _name: string = null) {
  }

  get value() {
    return null;
  }

  setValue(value: T): { value: T; storeField: IStoreField<T> } {
    return {value, storeField: this};
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    if (this._name) {
      throw new Error('Name of StoreValueField already exists: ' + this._name);
    }

    this._name = value;
  }

  next($event: T) {
    this.valueEvent.next($event);
  }

  get type() {
    return '!TODO';
  }

  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.valueEvent.subscribe(next, error, complete);
  }
}
