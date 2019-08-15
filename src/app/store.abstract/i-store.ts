import {IUniqueElement} from '../abstract/i-unique-element';
import {StoreScalarField} from './store-scalar-field';

export interface IStore extends IUniqueElement {

  fields: StoreScalarField<any>[];

  toNameValueJson(): object;
}
