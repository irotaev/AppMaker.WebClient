import {IUniqueElement} from '../abstract/i-unique-element';
import {IStoreField} from './i-store-field';
import {Store} from './store';

export interface IStore extends IUniqueElement {

  fields: IStoreField<any>[];

  addField<T>(field: IStoreField<T>): { field: IStoreField<T>; store: Store };

  getField<T>(name: string): IStoreField<T>;

  getFieldByIndex<T>(index: number): IStoreField<T>;

  toNameValueJson(): object;
}
