import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerService} from './server.service';

@Injectable({
  providedIn: 'root',
})
export class NgProcessService {
  private _webSocket: WebSocket;

  public logToConsole = true;

  constructor(
    private _httpClient: HttpClient,
    private _serverService: ServerService) {

  }

  public init(url: string) {
    this.createWebSocket(url);
  }

  private createWebSocket(url: string) {
    this._webSocket = new WebSocket(url);

    this._webSocket.onmessage = (event) => {
      if (this.logToConsole) {
        console.log('ng-process: ' + event.data);
      }

      this.parseMessage(event.data);
    };

    this._webSocket.onerror = (event) => {
      console.log('WebSocket unexpected error: ' + event);
    };

    this._webSocket.onclose = (event) => {
      if (this.logToConsole) {
        console.log('WebSocket closed. Event: ' + event);
      }
    };
  }

  public writeCommand(command: string) {
    if (!command) {
      return;
    }

    this._httpClient.post(this._serverService.baseHttpUrl + '/ngcli' + '/ng-console-write', JSON.stringify({command}), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).toPromise();
  }

  private parseMessage(message: string) {
    if (!message) {
      return null;
    }

  }
}
