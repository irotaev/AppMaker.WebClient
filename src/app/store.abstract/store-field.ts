import {BehaviorSubject} from 'rxjs';
import {IStoreField} from './i-store-field';
import {Subscription} from 'rxjs';

export class StoreField<T> implements IStoreField<T> {
  constructor(private _name: string = null) {
  }

  private readonly valueEvent: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  get value(): T {
    return this.valueEvent.getValue();
  }

  set value(value: T) {
    this.valueEvent.next(value);
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    if (this._name) {
      throw new Error('Name of StoreField already exists: ' + this._name);
    }

    this._name = value;
  }

  get type() {
    return (typeof this.value);
  }

  setValue(value: T): { value: T; storeField: StoreField<T> } {
    this.value = value;

    return {value, storeField: this};
  }

  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.valueEvent.subscribe(next, error, complete);
  }
}
