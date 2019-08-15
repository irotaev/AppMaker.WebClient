import {StoreEventField} from './store-event-field';

export class StoreScalarField<T> extends StoreEventField<T> {
  constructor(_name: string = null) {
    super(_name);
  }

  get value(): T {
    return this.valueEvent.getValue();
  }

  set value(value: T) {
    this.valueEvent.next(value);
  }

  setValue(value: T): { value: T; storeField: StoreScalarField<T> } {
    this.value = value;

    return {value, storeField: this};
  }
}
