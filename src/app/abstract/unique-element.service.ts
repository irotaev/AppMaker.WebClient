import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UniqueElementService {
  generateUniqueId() {
    return (Math.random() * 100).toString();
  }
}
