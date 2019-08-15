import {Subscription} from 'rxjs';

export interface IStoreField<T> {
  value: T;
  name: string;
  type: string;

  next($event: T);

  setValue(value: T): { value: T; storeField: IStoreField<T> };

  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
}
