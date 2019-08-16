import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UniqueElementRoutine {
  generateUniqueId() {
    return (Math.random() * 100).toString();
  }
}
