import {Subscription} from 'rxjs';

export interface IStoreEventField<T> {
  name: string;
  type: string;
  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
}
