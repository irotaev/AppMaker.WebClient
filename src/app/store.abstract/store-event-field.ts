import {BehaviorSubject, Subscription} from 'rxjs';

export class StoreEventField<T> {
  protected readonly valueEvent: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  constructor(protected _name: string = null) {
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    if (this._name) {
      throw new Error('Name of StoreScalarField already exists: ' + this._name);
    }

    this._name = value;
  }

  get type() {
    return '!TODO';
  }

  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.valueEvent.subscribe(next, error, complete);
  }
}
