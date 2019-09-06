import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import '@vaadin/vaadin-split-layout';
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import ICursorPositionChangedEvent = monaco.editor.ICursorPositionChangedEvent;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private _httpClient: HttpClient) {
  }

  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true
  };
  code = 'function x() {\nconsole.log("Hello world!");\n}';

  @ViewChild('monacoEditor', {static: false}) monacoEditor: ElementRef;
  @ViewChild('sciPreviewWrapper', {static: false}) sciPreviewWrapper: ElementRef;


  private _editor: IStandaloneCodeEditor;

  private _previouseLineNumber = 0;
  private _lastHighlightElement = null;

  private analyze;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    const socket = new WebSocket('wss://localhost:44397/ngcli' + '/ng-console');
    socket.onmessage = (e) => {
      console.log('Recieved: ' + e.data);
    };
    socket.onerror = (e) => {
      console.log('ws error: ' + e);
    };
    socket.onclose = (e) => {
      console.log('ws close: ' + e);
    };
  }

  onInit(editor: IStandaloneCodeEditor) {
    this._editor = editor;

    this._httpClient.get('https://localhost:44397/ngcli' + '/get-file-text?fileName=' + 'app.component.html', {responseType: 'text'}).subscribe(text => {

      const model = monaco.editor.createModel(
        text,
        'html',
        monaco.Uri.file('./file.html')
      );

      editor.setModel(model);

      editor.onDidChangeCursorPosition($event => this.onDidChangeCursorPosition($event));
    });
  }

  private onDidChangeCursorPosition(e: ICursorPositionChangedEvent) {
    if (e.position.lineNumber !== this._previouseLineNumber) {
      const content = this._editor.getModel().getLineContent(e.position.lineNumber);

      const result = content.match(/.*id=\"([^\s]+)\".*/);

      if (result) {
        this._lastHighlightElement = {id: result[1], style: '3px solid green'};

        (this.sciPreviewWrapper.nativeElement as HTMLIFrameElement).contentWindow.postMessage(
          this._lastHighlightElement,
          'http://localhost:4200');
      } else if (this._lastHighlightElement) {
        this._lastHighlightElement.style = '';
        (this.sciPreviewWrapper.nativeElement as HTMLIFrameElement).contentWindow.postMessage(
          this._lastHighlightElement,
          'http://localhost:4200');

        this._lastHighlightElement = null;
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.altKey && e.key === 's') {
      this._httpClient.post(
        'https://localhost:44397/ngcli' + '/save-file-text',
        JSON.stringify({
          fileName: 'app.component.html',
          fileText: this._editor.getModel().getValue()
        }), {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }).subscribe(x => console.log(x));
    } else if (e.altKey && e.key === 'Enter') {
      console.log('enter');
    }
  }

  onNgServeClick() {
    this._httpClient.get('https://localhost:44397/ngcli' + '/serve').subscribe(text => {
    });
  }
}
