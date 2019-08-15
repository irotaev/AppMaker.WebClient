import {IUniqueElement} from '../abstract/i-unique-element';
import {IStoreField} from './i-store-field';

export interface IStore extends IUniqueElement {

  fields: IStoreField<any>[];

  toNameValueJson(): object;
}
