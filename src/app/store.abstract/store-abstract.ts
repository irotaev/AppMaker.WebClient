import {IStore} from './iStore';

export abstract class StoreAbstract<T extends IStore> implements IStore {
  readonly id = Math.random();
}
