import {IUniqueElement} from './IUniqueElement';

export class UniqueElement<T> implements IUniqueElement {
  constructor(public readonly uniqueElement: T, public readonly uniqueId: string) {
  }
}
