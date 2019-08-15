import {Subscription} from 'rxjs';

export interface IStoreField<T> {
  value: T;
  name: string;
  type: string;
  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
}
