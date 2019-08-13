import {Injectable} from '@angular/core';
import {UniqueElement} from './uniqueElement';

@Injectable({
  providedIn: 'root',
})
export class UniqueElementService {
  generateUniqueId() {
    return Math.random() * 100;
  }

  createUniqueElement<T>(element: T) {
    return new UniqueElement(element, this.generateUniqueId());
  }
}
