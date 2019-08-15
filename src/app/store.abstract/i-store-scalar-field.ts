import {IStoreEventField} from './i-store-event-field';

export interface IStoreScalarField<T> extends IStoreEventField<T> {
  value: T;
}
