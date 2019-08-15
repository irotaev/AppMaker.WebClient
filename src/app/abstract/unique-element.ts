import {IUniqueElement} from './i-unique-element';

export class UniqueElement<T> implements IUniqueElement {
  constructor(public readonly uniqueElement: T, public readonly uniqueId: string) {
  }
}
