import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApmCArtboardComponent} from './apm-c-artboard/apm-c-artboard.component';
import {CListComponent} from './c-list/c-list.component';
import {AmpCFlexboxComponent} from './apm-c.flexbox/amp-c-flexbox.component';
import {ApmCPropertyListComponent} from './apm-c-property-list/apm-c-property-list.component';
import {ApmCPropertyEditorComponent} from './apm-c-property-editor/apm-c-property-editor.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ApmCArtboardComponent,
    CListComponent,
    AmpCFlexboxComponent,
    ApmCPropertyListComponent,
    ApmCPropertyEditorComponent
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
    FormsModule
  ],
  entryComponents: [AmpCFlexboxComponent, ApmCPropertyListComponent, ApmCPropertyEditorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
