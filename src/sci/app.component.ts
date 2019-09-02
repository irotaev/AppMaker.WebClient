import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private _httpClient: HttpClient) {
  }

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code = 'function x() {\nconsole.log("Hello world!");\n}';

  @ViewChild('monacoEditor', {static: false}) monacoEditor: ElementRef;


  private _editor: IStandaloneCodeEditor;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {


    // setTimeout(() => {
    //   this._editor = editor.create(this.monacoEditor.nativeElement, {
    //     theme: 'vs-dark',
    //     language: 'typescript',
    //   });
    //   //
    //   // const model = monaco.editor.createModel(
    //   //   this.code,
    //   //   'typescript',
    //   //   monaco.Uri.file('./file.ts')
    //   // );
    //   //
    //   // this._editor.setModel(model);
    // }, 3000);

  }

  onInit(editor: IStandaloneCodeEditor) {
    this._editor = editor;

    this._httpClient.get('https://localhost:44397/api/values' + '/get-file', {responseType: 'text'}).subscribe(text => {
      // this.monacoEditor. = text as string;

      // @ts-ignore
      document.me = this.monacoEditor;

      // this.monacoEditor.model = new AngularEditorModel {}{}

      const model = monaco.editor.createModel(
        text,
        'html',
        monaco.Uri.file('./file.html')
      );

      editor.setModel(model);
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.altKey && e.key === 's') {
      this._httpClient.post(
        'https://localhost:44397/api/values' + '/save-file',
          JSON.stringify(this._editor.getModel().getValue()), {
          headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })}).subscribe(x => console.log(x));
    }
  }
}
