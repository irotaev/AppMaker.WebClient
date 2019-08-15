import {Injectable} from '@angular/core';
import {UniqueElement} from './unique-element';

@Injectable({
  providedIn: 'root',
})
export class UniqueElementService {
  generateUniqueId() {
    return (Math.random() * 100).toString();
  }

  createUniqueElement<T>(element: T) {
    return new UniqueElement(element, this.generateUniqueId());
  }
}
