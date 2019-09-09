import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  get baseHttpUrl() {
    return 'https://localhost:44397';
  }

  get baseWsUrl() {
    return 'wss://localhost:44397';
  }
}
