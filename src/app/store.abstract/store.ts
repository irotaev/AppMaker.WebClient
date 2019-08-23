import {IStore} from './i-store';
import {UniqueElementRoutine} from '../routine/unique-element.routine';
import * as _ from 'lodash';
import {IStoreField} from './i-store-field';
import {StoreEventField} from './store-event-field';
import {BehaviorSubject, Subscription} from 'rxjs';
import {JsonObject, JsonProperty} from 'json2typescript';
import {QueueRoutine} from '../routine/queue.routine';

@JsonObject
export class Store implements IStore {
  @JsonProperty() uniqueId: string;
  @JsonProperty() private readonly _fields: IStoreField<any>[] = [];
  private readonly _addFieldEvent = new BehaviorSubject<IStoreField<any>>(null);

  protected _uniqueElementService;

  constructor() {
    this._uniqueElementService = QueueRoutine.injector.get(UniqueElementRoutine);
    this.uniqueId = this._uniqueElementService.generateUniqueId();
  }

  get fields() {
    return this._fields;
  }

  addField<T>(field: IStoreField<T>): { field: IStoreField<T>; store: Store } {
    if (!field.name) {
      throw new Error('Field must have not empty name');
    }

    const previousField = _.find<IStoreField<T>>(this._fields, x => x.name === field.name);
    if (previousField) {
      return {field: previousField, store: this};
    }

    this._fields.push(field);

    this._addFieldEvent.next(field);

    return {field, store: this};
  }

  getField<T>(name: string): IStoreField<T> {
    return _.find(this._fields, x => x.name === name);
  }

  getFieldByIndex<T>(index: number): IStoreField<T> {
    return this._fields[index];
  }

  toNameValueJson(): object {
    const json: any = {};

    _.forEach(this._fields, x => {
      json[x.name] = x.value;
    });

    return json;
  }

  subscribe<T extends IStoreField<any>>(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this._addFieldEvent.subscribe(next, error, complete);
  }

  protected bindFields() {
    const fields = Object.getOwnPropertyNames(this);
    _.forEach(fields, fieldName => {

      if ((this[fieldName] as object) instanceof StoreEventField) {
        if (!this[fieldName].name) {
          this[fieldName].name = fieldName;
        }

        this.addField(this[fieldName]);
      }

    });
  }
}
