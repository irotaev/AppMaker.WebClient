import {StoreEventField} from './store-event-field';
import {IStoreField} from './i-store-field';
import {Subscription} from 'rxjs';

export class StoreValueField<T> extends StoreEventField<T> {
  constructor(_name: string = null) {
    super(_name);
  }

  get value(): T {
    return this.valueEvent.getValue();
  }

  set value(value: T) {
    this.valueEvent.next(value);
  }

  next(value: T) {
    this.value = value;
    this.valueEvent.next(value);
  }

  setValue(value: T): { value: T; storeField: IStoreField<T> } {
    this.next(value);

    return {value, storeField: this};
  }
}
