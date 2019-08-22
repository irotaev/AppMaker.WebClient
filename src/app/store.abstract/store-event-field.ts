import {BehaviorSubject, Subscription} from 'rxjs';
import {IStoreField} from './i-store-field';
import {QueueRoutine} from '../routine/queue.routine';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject()
export class StoreEventField<T> implements IStoreField<T> {
  @JsonProperty() protected readonly valueEvent: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  @JsonProperty() protected _name;

  protected _queueRoutine: QueueRoutine

  constructor(name: string = null) {
    this._queueRoutine = QueueRoutine.injector.get(QueueRoutine);
    this._name = name;
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

  subscribeWithOrder(
    key: string,
    index: number,
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void): string {

    if (this._queueRoutine.addRoutine(key, index, next)) {

      this.valueEvent.subscribe((value: T) => {
        this._queueRoutine.next(key, value);
      }, error, complete);
    }

    return key;
  }
}
