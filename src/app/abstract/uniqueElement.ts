import {IUnique} from './iUnique';

export class UniqueElement<T> implements IUnique {
  constructor(public readonly uniqueElement: T, public readonly uniqueId: number) {

    // For nesting
    //
    if (uniqueElement == null) {
      // @ts-ignore
      uniqueElement = this;
    }
  }
}
