import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code = 'function x() {\nconsole.log("Hello world!");\n}';

  @ViewChild('monacoEditor', {static: false}) monacoEditor: ElementRef;

  constructor(private _httpClient: HttpClient) {
  }

  private _editor: IStandaloneCodeEditor;

  onInit(editor) {
    console.log(editor);
  }

  ngOnInit(): void {
    // this._httpClient.get('https://localhost:44397/api/values' + '/get-file', {responseType: 'text'}).subscribe(text => {
    //   this.text = text as string;
    //
    //   // @ts-ignore
    //   document.me = this.monacoEditor;
    //
    //   // this.monacoEditor.model = new AngularEditorModel {}{}
    //
    // });
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
}
