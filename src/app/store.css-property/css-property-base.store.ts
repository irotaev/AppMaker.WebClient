import {StoreAbstract} from '../store.abstract/store-abstract';

export class CssPropertyBaseStore extends StoreAbstract<CssPropertyBaseStore> {
  width = '200px';
  height = '50px';

  toStyleObject() {
    return {
      width: this.width,
      height: this.height
    };
  }
}
