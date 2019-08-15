import {IUniqueElement} from '../abstract/i-unique-element';
import {StoreField} from './store-field';

export interface IStore extends IUniqueElement {

  fields: StoreField<any>[];

  toNameValueJson(): object;
}
