import {StoreFieldType} from './store-field-type';
import {BehaviorSubject} from 'rxjs';

export class StoreField<T> {
  valueEvent: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  get value(): T {
    return this.valueEvent.getValue();
  }

  set value(value: T) {
    this.valueEvent.next(value);
  }

  type: StoreFieldType;
}
