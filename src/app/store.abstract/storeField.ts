import {BehaviorSubject} from 'rxjs';

export class StoreField<T> {
  constructor(private _name: string) {
    if (!_name) {
      throw new Error('Can not set null name for StoreField ');
    }
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

  get type() {
    return (typeof this.value);
  }

  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void) {
    return this.valueEvent.subscribe(next, error, complete);
  }
}
