import {Injectable, Type} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeFromStrRoutine {
  private readonly _typeToStr = new Map<string, Type<any>>();

  setType<T>(typeStr: string, type: Type<T>) {
    return this._typeToStr.set(typeStr, type);
  }

  getType<T>(typeStr: string): Type<T> {
    return this._typeToStr.get(typeStr);
  }
}
