import {StoreAbstract} from '../store.abstract/store-abstract';
import {StoreField} from '../store.abstract/store-field';

export class CssPropertyBaseStore extends StoreAbstract<CssPropertyBaseStore> {
  constructor() {
    super();

    this.width.value = '200px';
    this.height.value = '50px';
  }

  width = new StoreField<string>();
  height = new StoreField<string>();

  toStyleObject() {
    return {
      width: this.width.value,
      height: this.height.value
    };
  }
}
