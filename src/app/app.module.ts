import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApmCArtboardComponent} from './apm-c-artboard/apm-c-artboard.component';
import {ApmCListComponent} from './c-list/apm-c-list.component';
import {AmpCFlexboxComponent} from './apm-c.flexbox/amp-c-flexbox.component';
import {ApmCPropertyEditorComponent} from './apm-c-property-editor/apm-c-property-editor.component';
import {FormsModule} from '@angular/forms';
import {ApmCBlocklyComponent} from './apm-c.blockly/apm-c-blockly.component';
import {QueueRoutine} from './routine/queue.routine';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    ApmCArtboardComponent,
    ApmCListComponent,
    AmpCFlexboxComponent,
    ApmCPropertyEditorComponent,
    ApmCBlocklyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatExpansionModule
  ],
  entryComponents: [
    AmpCFlexboxComponent,
    ApmCPropertyEditorComponent,
    ApmCArtboardComponent,
    ApmCBlocklyComponent,
    ApmCListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    QueueRoutine.injector = injector;
  }
}
